feature 'Create event' do
  include EventFormHelpers

  let(:event) { build :event }

  before do
    visit '/'

    open_create_modal
  end

  example 'users can create events successfully' do
    step 'fill event fields' do
      fill_in 'title', with: event.title
      fill_in 'description', with: event.description

      start_date_at_beginning_of_month
      end_date_at_beginning_of_month
    end

    step 'save event' do
      save_form
    end

    step 'see the event in calendar' do
      expect(page).to have_css calendar_event_selector, text: event.title
    end
  end

  example 'users can not create events with invalid data' do
    step 'save event' do
      save_form
    end

    step 'see the event errors' do
      expect(page).to have_text 'Can\'t be blank'
    end
  end

  def open_create_modal
    click_button('+')
  end

  def save_form
    click_button('Create')
  end
end
