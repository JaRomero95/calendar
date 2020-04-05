feature 'Create event' do
  include EventFormHelpers

  let!(:event) { create :event, start_date: Time.zone.now.beginning_of_day }
  let(:new_event) { build :event }

  before do
    visit '/'

    open_update_modal event
  end

  example 'users can update events successfully' do
    step 'fill event fields' do
      fill_in 'title', with: new_event.title
    end

    step 'save event' do
      save_form
    end

    step 'see the updated event in calendar' do
      expect(page).to have_css calendar_event_selector, text: new_event.title
    end
  end

  example 'users can not update events with invalid data' do
    step 'fill event fields' do
      fill_in 'title', with: ''
    end

    step 'save event' do
      save_form
    end

    step 'see the event errors' do
      expect(page).to have_text 'Can\'t be blank'
    end
  end

  def open_update_modal(event)
    open_event_modal(event)
    click_button('Edit')
  end

  def save_form
    click_button('Save')
  end
end
