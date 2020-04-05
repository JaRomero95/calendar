feature 'Calendar week view' do
  it_behaves_like 'calendar view' do
    let(:beginning_of_week) { Date.today.beginning_of_week.beginning_of_day }
    let(:end_of_week) { Date.today.end_of_week.end_of_day.change(usec: 0) }

    let!(:first_event) { create :event, start_date: beginning_of_week }
    let!(:last_event) { create :event, start_date: end_of_week }

    let!(:past_event) { create :event, start_date: beginning_of_week - 1.minute }
    let!(:future_event) { create :event, start_date: end_of_week + 1.minute }

    before do
      visit '/'

      click_button('Week')
    end
  end
end
