RSpec.shared_examples 'filterable model' do |options|
  filter = options.fetch(:filter)
  attrs_for_expected_record = options.fetch(:attrs_for_target, {})
  attrs_for_unexpected_records = options.fetch(:attrs_for_unexpected_records, [])

  let(:expected_record) { create(factory_name, attrs_for_expected_record) }
  let(:unexpected_records) { create_unexpected_records(attrs_for_unexpected_records) }
  let(:result) { described_class.filter(filter) }

  it 'find only the expected record' do
    expect(result).to match_array [expected_record]
  end

  def create_unexpected_records(attrs)
    raise 'Must have at least attributes for an unexpected record' if attrs.empty?

    attrs.map { |attr_hash| create(factory_name, attr_hash) }
  end

  def factory_name
    described_class.name.underscore
  end
end
