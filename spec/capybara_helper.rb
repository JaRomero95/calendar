RSpec.configure do |config|
  break if config.files_to_run.select { |x| x.include?('features') }.empty?

  require 'capybara/rspec'

  include RSpec::Longrun::DSL

  config.default_formatter = RSpec::Longrun::Formatter

  config.before :suite do
    port = 3333

    Capybara.server_port = port

    next if ENV['SKIP_BUILD'].present?

    Dir.chdir('./client') do
      `yarn install`

      command = "REACT_APP_API_BASE_URL='http://#{Capybara.server_host}'" \
                " REACT_APP_API_PORT=#{port}" \
                ' yarn run build'

      `#{command}`
    end

    `cp -Rv client/build/* public`
  end

  config.before :each, type: :feature do |example|
    Capybara.current_driver = example.metadata[:driver] || :chrome_headless
  end

  config.after :each, js: true do
    errors = page.driver.browser.manage.logs.get(:browser)
    if errors.present?
      aggregate_failures 'javascript errrors' do
        errors.each do |error|
          expect(error.level).not_to eq('SEVERE'), error.message

          next unless error.level == 'WARNING'

          warn "WARN: javascript warning: #{error.message}"
        end
      end
    end
  end

  Capybara.register_driver :chrome_headless do |app|
    Capybara::Selenium::Driver.new(
      app,
      browser: :chrome,
      options: Selenium::WebDriver::Chrome::Options.new(
        args: %w[headless no-sandbox disable-gpu window-size=500,600]
      )
    )
  end

  Capybara.register_driver :chrome do |app|
    Capybara::Selenium::Driver.new(app, browser: :chrome, args: ['--window-size=1920,1080'])
  end

  Capybara.javascript_driver = :chrome
  Capybara.server = :puma, {Silent: true}

  config.before :suite do
    FileUtils.rm_rf(capybara_errors_dir)
  end

  config.after :each, type: :feature do |example|
    next unless example.exception

    description = example.metadata[:full_description].gsub(/\s+/, '_').downcase
    page.save_screenshot "#{capybara_errors_dir}/error_#{description}.png"
  end

  def capybara_errors_dir
    dir = Rails.root.join 'tmp', 'capybara', 'errors'

    FileUtils.mkdir_p(dir) unless File.directory?(dir)

    dir
  end
end
