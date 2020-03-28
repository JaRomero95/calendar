class EventsController < ApplicationController
  before_action :find_event, only: %i[show update destroy]

  def index
    puts "======>"
    puts params.inspect
    puts "2"
    puts params.fetch(:filter, {})
    puts "3"
    puts params.fetch(:filter, {}).class.name
    puts "======>"
    @events = Event.filter(filter_params)

    render_index @events
  end

  def show
    render_show @event
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      render_create @event
    else
      render_errors @event.errors
    end
  end

  def update
    if @event.update(event_params)
      render_update @event
    else
      render_errors @event.errors
    end
  end

  def destroy
    @event.destroy
  end

  private

  def find_event
    @event = Event.find(params[:id])
  end

  def filter_params
    params.fetch(:filter, {})
          .permit(:start_date_from, :start_date_until)
  end

  def event_params
    params.require(:data).permit(:title, :description, :start_date, :end_date)
  end
end
