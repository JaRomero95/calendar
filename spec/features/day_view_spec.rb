feature 'Calendar day view' do
  it_behaves_like 'calendar view' do
    let(:beginning_of_day) { Date.today.beginning_of_day }
    let(:end_of_day) { Date.today.end_of_day.change(usec: 0) }

    let!(:first_event) { create :event, start_date: beginning_of_day }
    let!(:last_event) { create :event, start_date: end_of_day }

    let!(:past_event) { create :event, start_date: beginning_of_day - 1.minute }
    let!(:future_event) { create :event, start_date: end_of_day + 1.minute }

    before do
      visit '/'

      click_button('Day')
    end
  end
end
