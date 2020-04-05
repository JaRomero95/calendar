require 'rails_helper'

RSpec.describe Event, type: :model do
  let(:instance) { build :event }

  it_behaves_like 'filterable model', filter: {start_date_from: Time.zone.now},
                                      attrs_for_target: {start_date: Time.zone.now},
                                      attrs_for_unexpected_records: [
                                        {start_date: 1.minute.ago}
                                      ]

  it_behaves_like 'filterable model', filter: {start_date_until: Time.zone.now},
                                      attrs_for_target: {start_date: 1.minute.ago},
                                      attrs_for_unexpected_records: [
                                        {start_date: 1.minute.after}
                                      ]

  describe 'Fields' do
    it { should have_db_column(:title).of_type(:string).with_options(limit: 60) }
    it { should have_db_column(:description).of_type(:text) }
    it { should have_db_column(:start_date).of_type(:datetime) }
    it { should have_db_column(:end_date).of_type(:datetime) }
  end

  describe 'Validations' do
    describe 'title' do
      it { should validate_presence_of(:title) }
      it { should validate_length_of(:title).is_at_most(60) }
    end

    describe 'start_date' do
      it { should validate_presence_of(:start_date) }
    end

    describe 'end_date' do
      it { should validate_presence_of(:end_date) }

      it 'should be greather than start_date' do
        instance.end_date = instance.start_date - 1.minute

        expect(instance).to be_invalid
      end

      it 'can be equal than start_date' do
        instance.end_date = instance.start_date

        expect(instance).to be_valid
      end
    end
  end
end
