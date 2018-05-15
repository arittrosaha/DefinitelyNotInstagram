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

demoUser.avatar = "https://s3.amazonaws.com/definitely-not-instagram-dev/users/demoFace.png"
demoUser.save!

Post.destroy_all

post1 = Post.create!(
  caption: "When I am not impressed",
  author_id: demoUser.id
)

post1.image = "https://s3.amazonaws.com/definitely-not-instagram-dev/posts/demoface.jpg"
post1.save!

post2 = Post.create!(
  caption: "When I was in App Academy",
  author_id: demoUser.id
)

post2.image = "https://s3.amazonaws.com/definitely-not-instagram-dev/posts/coffeeface.jpg"
post2.save!

post3 = Post.create!(
  caption: "#$%^&",
  author_id: demoUser.id
)

post3.image = "https://s3.amazonaws.com/definitely-not-instagram-dev/posts/angry.png"
post3.save!

post4 = Post.create!(
  caption: "When I was fifteen",
  author_id: demoUser.id
)

post4.image = "https://s3.amazonaws.com/definitely-not-instagram-dev/posts/braces.png"
post4.save!

post5 = Post.create!(
  caption: "When I am feeling pretentious",
  author_id: demoUser.id
)

post5.image = "https://s3.amazonaws.com/definitely-not-instagram-dev/posts/monoclesized.png"
post5.save!

post6 = Post.create!(
  caption: "My friend Pizza",
  author_id: demoUser.id
)

post6.image = "https://s3.amazonaws.com/definitely-not-instagram-dev/posts/pizza.jpg"
post6.save!

post7 = Post.create!(
  caption: "When I see a beautiful emoji pass by",
  author_id: demoUser.id
)

post7.image = "https://s3.amazonaws.com/definitely-not-instagram-dev/posts/hearteyes.png"
post7.save!
