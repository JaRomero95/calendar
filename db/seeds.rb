1000.times do
  start_date = Faker::Time.between from: 1.year.ago, to: 1.year.after
  FactoryBot.create :event, title: Faker::Movies::HarryPotter.location,
                            description: Faker::Movies::HarryPotter.quote,
                            start_date: start_date
end
