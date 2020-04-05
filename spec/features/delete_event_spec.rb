feature 'Create event' do
  include EventFormHelpers

  let!(:event) { create :event, start_date: Time.zone.now.beginning_of_day }

  before do
    visit '/'

    open_event_modal(event)
  end

  example 'users can delete events' do
    step 'open delete confirmation' do
      click_delete
    end

    step 'confirm delete' do
      click_delete
    end

    step 'can not see the deleted event in calendar' do
      expect(page).not_to have_css calendar_event_selector, text: event.title
    end
  end

  def click_delete
    click_button('Delete')
  end
end
