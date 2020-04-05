module EventFormHelpers
  def open_event_modal(event)
    find(calendar_event_selector, text: event.title).click
  end

  def start_date_at_beginning_of_month
    date_at_beginning_of_month 'start_date'
  end

  def end_date_at_beginning_of_month
    date_at_beginning_of_month 'end_date'
  end

  def date_at_beginning_of_month(field_name)
    find("input[name=#{field_name}]").click
    find('.flatpickr-day:not(.prevMonthDay)', match: :first).click
  end

  def calendar_event_selector
    '.rbc-event-content'
  end
end
