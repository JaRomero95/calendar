class Event < ApplicationRecord
  validates :title, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

  validate :ends_after_it_has_started

  private

  def ends_after_it_has_started
    return unless start_date && end_date

    errors.add(:end_date, :ends_before_it_has_started) if end_date < start_date
  end
end
