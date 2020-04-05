feature 'Show event' do
  include EventFormHelpers

  let!(:event) { create :event, start_date: Time.zone.now.beginning_of_day }

  before do
    visit '/'

    open_event_modal event
  end

  example 'users can show events', aggregate_failures: true do
    within '.modal-body' do
      expect(page).to have_text event.title
      expect(page).to have_text event.description
      expect(page).to have_text format_date(event.start_date)
      expect(page).to have_text format_date(event.end_date)
    end
  end

  def format_date(date)
    date.strftime '%-m/%-d/%Y %-l:%M %p'
  end
end
