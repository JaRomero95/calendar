feature 'Calendar agenda view' do
  it_behaves_like 'calendar view' do
    let(:beginning_of_day) { Date.today.beginning_of_day }
    let(:end_of_agenda) { 30.days.after.beginning_of_day }

    let!(:first_event) { create :event, start_date: 1.minute.after }
    let!(:last_event) { create :event, start_date: end_of_agenda }

    let!(:past_event) { create :event, start_date: beginning_of_day }
    let!(:future_event) { create :event, start_date: end_of_agenda + 1.day }

    before do
      visit '/'

      click_button('Agenda')
    end
  end
end
