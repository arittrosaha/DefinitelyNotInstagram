# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all

demoUser = User.create!(
  email: 'demoUser@gmail.com',
  full_name: 'Demo User',
  username: 'demoUser',
  password: 'DemoUserAS',
  bio: "Hello, welcome to Definitely Not Instagram! My name is Demo... Wait, what? I just realized, my name is 'Demo User' -.- ! Who in the world gave me this horrible name?",
)

demoUser.avatar = "https://s3.amazonaws.com/definitely-not-instagram-dev/users/demoface.jpg"
demoUser.save!
