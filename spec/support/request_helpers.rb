module RequestHelpers
  def json_data
    json['data']
  end

  def json
    JSON.parse(response.body)
  end

  def mock_model_filters(model_class, filter_keys)
    filter_keys.each { |filter_key| mock_model_filter(model_class, filter_key) }
  end

  def mock_model_filter(model_class, filter_key)
    full_filter_name = "filter_by_#{filter_key}"

    allow(model_class).to receive(full_filter_name).and_return(model_class.where(nil))
  end
end
