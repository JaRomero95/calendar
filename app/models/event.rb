class Event < ApplicationRecord
  validates :title, presence: true,
                    length: {maximum: 60}
  validates :start_date, presence: true
  validates :end_date, presence: true

  validate :ends_after_it_has_started

  scope :filter_by_start_date_from, ->(value) { where('start_date >= ?', value) }
  scope :filter_by_start_date_until, ->(value) { where('start_date <= ?', value) }

  private

  def ends_after_it_has_started
    return unless start_date && end_date

    errors.add(:end_date, :ends_before_it_has_started) if end_date < start_date
  end
end
