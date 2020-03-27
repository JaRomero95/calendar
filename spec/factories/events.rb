FactoryBot.define do
  factory :event do
    title { Faker::Movies::HarryPotter.location }
    description { Faker::Movies::HarryPotter.quote }
    start_date { Faker::Time.forward }
    end_date { start_date + 2.hours }
  end
end
