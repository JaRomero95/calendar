require 'rails_helper'

RSpec.describe '/events', type: :request do
  let(:model_class) { Event }
  let(:event) { build :event }

  describe 'GET /index' do
    let(:filters) do
      {
        start_date_from: nil,
        start_date_until: nil
      }
    end

    before do
      event.save

      mock_model_filters(model_class, filters.keys)

      get events_url, params: {filter: filters}
    end

    it { expect(response).to have_http_status(200) }

    it 'renders correct json' do
      expect(json_data).to match_array [event.as_json]
    end

    describe 'Filters' do
      it { expect(model_class).to have_received(:filter_by_start_date_from) }
      it { expect(model_class).to have_received(:filter_by_start_date_until) }
    end
  end

  describe 'GET /show' do
    context 'when resource exist' do
      before do
        event.save

        get event_url(event)
      end

      it { expect(response).to have_http_status(200) }

      it 'renders correct json' do
        expect(json_data).to eq event.as_json
      end
    end

    context 'when resource not exist' do
      before do
        get event_url(id: 'fake')
      end

      it { expect(response).to have_http_status(404) }
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      before do
        post events_url, params: {data: attributes_for(:event)}
      end

      it 'creates a new Event' do
        expect(Event.count).to eq 1
      end

      it { expect(response).to have_http_status(201) }

      it 'renders correct json' do
        expect(json_data).to eq Event.first.as_json
      end
    end

    context 'with invalid parameters' do
      before do
        post events_url, params: {data: {title: 'invalid'}}
      end

      it 'not creates a new Event' do
        expect(Event.count).to eq 0
      end

      it { expect(response).to have_http_status(422) }

      it 'renders correct json' do
        expect(json).to include('errors' => a_kind_of(Hash))
      end
    end

    context 'without required parameter' do
      before do
        post events_url, params: {data: {}}
      end

      it 'not creates a new Event' do
        expect(Event.count).to eq 0
      end

      it { expect(response).to have_http_status(422) }

      it 'renders correct json' do
        expect(json).to include('errors' => {'data' => I18n.t('errors.required')})
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) { attributes_for(:event).stringify_keys }

      before do
        event.save

        put event_url(event), params: {data: new_attributes}

        event.reload
      end

      it 'changes Event attributes' do
        expect(event.attributes).to include(new_attributes)
      end

      it { expect(response).to have_http_status(200) }

      it 'renders correct json' do
        expect(json_data).to eq event.as_json
      end
    end

    context 'with invalid parameters' do
      let(:invalid_attributes) { {title: ''} }

      before do
        event.save

        put event_url(event), params: {data: invalid_attributes}

        event.reload
      end

      it 'not changes Event' do
        expect(event.attributes).not_to include(invalid_attributes)
      end

      it { expect(response).to have_http_status(422) }

      it 'renders correct json' do
        expect(json).to include('errors' => a_kind_of(Hash))
      end
    end

    context 'when resource not exist' do
      before do
        put event_url(id: 'fake')
      end

      it { expect(response).to have_http_status(404) }
    end

    context 'without required parameter' do
      before do
        event.save

        put event_url(event), params: {data: {}}
      end

      it { expect(response).to have_http_status(422) }

      it 'renders correct json' do
        expect(json).to include('errors' => {'data' => I18n.t('errors.required')})
      end
    end
  end

  describe 'DELETE /destroy' do
    context 'when resource exists' do
      before do
        event.save

        delete event_url(event)
      end

      it 'deletes Event' do
        expect(Event.count).to eq 0
      end

      it { expect(response).to have_http_status(204) }
    end

    context 'when resource not exist' do
      before do
        delete event_url(id: 'fake')
      end

      it { expect(response).to have_http_status(404) }
    end
  end
end
