class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::ParameterMissing, with: :param_required

  def record_not_found
    head 404
  end

  def param_required(exception)
    render_errors exception.param => I18n.t('errors.required')
  end

  def render_index(data)
    render_show(data)
  end

  def render_update(data)
    render_show(data)
  end

  def render_show(data)
    render json: {data: data.as_json},
           status: 200
  end

  def render_create(data, location: nil)
    location ||= data

    render json: {data: data.as_json},
           status: 201,
           location: location
  end

  def render_errors(errors)
    render json: {errors: errors.as_json},
           status: 422
  end
end
