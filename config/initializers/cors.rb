# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  client_app_url = "#{ENV['CLIENT_BASE_URL']}:#{ENV['CLIENT_PORT']}"

  allow do
    origins client_app_url
    resource '*', headers: :any, methods: :any
  end
end
