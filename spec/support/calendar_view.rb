RSpec.shared_examples 'calendar view' do
  feature 'Calendar month view' do
    let(:beginning_of_month) { Date.today.beginning_of_month.beginning_of_day }
    let(:end_of_month) { Date.today.end_of_month.end_of_day.change(usec: 0) }

    let!(:first_event) { create :event, start_date: beginning_of_month }
    let!(:last_event) { create :event, start_date: end_of_month }

    let!(:past_event) { create :event, start_date: beginning_of_month - 1.minute }
    let!(:future_event) { create :event, start_date: end_of_month + 1.minute }

    before do
      visit '/'
    end

    scenario 'users can see events of this month' do
      step 'see the first event of the month' do
        expect(page).to have_text(first_event.title)
      end

      step 'see the last event of the month' do
        expect(page).to have_text(last_event.title)
      end

      step 'can not see a past month event' do
        expect(page).not_to have_text(past_event.title)
      end

      step 'can not see a future month event' do
        expect(page).not_to have_text(future_event.title)
      end

      step 'navigate to a previous month' do
        click_button('Back')
      end

      step 'can see a past month event' do
        expect(page).to have_text(past_event.title)
      end

      step 'can not see events of the current month' do
        expect(page).not_to have_text(last_event.title)
      end

      step 'navigate to a future month' do
        2.times { click_button('Next') }
      end

      step 'can see a future month event' do
        expect(page).to have_text(future_event.title)
      end

      step 'can not see events of the current month' do
        expect(page).not_to have_text(first_event.title)
      end
    end
  end
end
