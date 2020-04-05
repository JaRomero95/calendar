feature 'Calendar month view' do
  it_behaves_like 'calendar view' do
    let(:beginning_of_month) { Date.today.beginning_of_month.beginning_of_day }
    let(:end_of_month) { Date.today.end_of_month.end_of_day.change(usec: 0) }

    let!(:first_event) { create :event, start_date: beginning_of_month }
    let!(:last_event) { create :event, start_date: end_of_month }

    let!(:past_event) { create :event, start_date: beginning_of_month - 1.minute }
    let!(:future_event) { create :event, start_date: end_of_month + 1.minute }

    before do
      visit '/'
    end
  end
end
