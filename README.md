# Definitely Not Instagram
[Live Link!](https://definitely-not-instagram.herokuapp.com/#/)

Note - The application is hosted in Heroku which puts the application in sleep if not visited for a while. Thus visiting the link at first might take longer than ususal. In the near future, I intend to incorporate Uptime Robot to fix this situation.


## Summary
**Synopsis** - Definitely Not Instagram is a full stack web application inspired by Instagram. It is built with a Ruby on Rails backend,  PostgreSQL database and React with a Redux architectural framework on the frontend.

**Stack** - Ruby on Rails, PostgreSQL, React.js, Redux.js, JS-ES6, HTML5, CSS3, AWS S3, Heroku.

**Key Points**:
* Leveraged Bcrypt gem to securely hash user passwords, ensuring protected authentication.
* Implemented Rails polymorphic associations for likes on posts and comments.
* Employed CSS3 flexbox and z-index and React-Modal for a compelling and flexible layout.
* Built responsive design for posts based on respective image dimension using custom JS function.
* Ensured calls to the database run asynchronously through the use of AJAX and Thunk middleware.
* Eager loaded associate user data, at time of log in, to minimize AJAX queries.
* Integrated Paperclip gem for image uploading and stored uploads on AWS S3 while saving their references in PostgreSQL database.
* Optimized code by creating reusable, DRY React components to improve maintainability and scalability.
* Utilized Redux and jBuilder to store fetched data and send backend JSON response, respectively.


## Current Features
#### Authentication / Landing page
* Sign up for a new account with a email, name, username and password.
* Log in to their account with their username and password.
* Log in with a demo user account.
* Receive errors for the following issues:
  * Password length is not greater or equal to six characters.
  * One of the field is missing.
  * Email is not in a valid email format.
#### Home
* Scroll through, in reverse-chronological order/ newest first, a list of user's own posts and their following users' posts with their respective information.
* Interact with each post's relevant options.
#### Profile
* See user information, profile picture and posts on user profile page.
* Change their profile picture by clicking their profile picture on their profile page when logged in.
* Edit Name, Username, Bio, Email of logged in user.
#### Posts
* Post an image with or without a caption.
* Delete a post.
* See the date of a post.
* Click individual post on user's profile to see post and its relevant information.
* Click user profile picture or username to go their profile page.
* Receive error if image is missing.
#### Likes
* Like a post.
* Unlike a post.
* See the number of likes along with UI to indicate if user liked the post.
#### Comments
* Comment on posts.
* Delete any comments under your posts and only user's own comments on a different user's post.
* Scroll through comments under posts.
* Receive errors is user wants to create a comment without any text.
#### Follows
* Follow a user.
* Unfollow a user.
* See the number of followers and followings of a user in their profile page.


## Current Technologies
#### [Backend](https://github.com/arittrosaha/DefinitelyNotInstagram/tree/master/app)
* Ruby on Rails
* Notable Gems:
  * pg - PostgreSQL for database.
  * bcrypt - For authentication to securely hash and salt user passwords.
  * paperclip - For file uploading.
    * Note - This gem has been depricated. In the near future, the app will be transitioned to Active Storage.
  * jQuery Rails - For the use of ajax calls and respective promises.
  * figaro - For integrating Heroku to host the application live.
  * aws-sdk - For utilizing Amazon Web Service's(AWS) S3 for storing user profile picture and uploads in a scalable manner.

#### [Frontend](https://github.com/arittrosaha/DefinitelyNotInstagram/tree/master/frontend)
* React and other relevant React npm packages.
* Redux and other relevant Redux npm packages.
* Webpack and other relevent Webpack npm packages.
* Babel and other relevent Babel npm packages.
* Lodash 


## Future Technologies
* Uptime Robot - to keep the application awake in Heroku servers.
* Active storage - to replace Paperclip.
* WebSocket - for real time notification and direct messaging.


## Future Features
#### Authentication / Landing page
* Continuous animation with the phone's screen continuosly changing.
* Circle check or cross animation on right of each field depending on relevant errors or lack their of.

#### Home
* Expand the right user box to contain scrollable list of user's followings which will be clickable to take them to the respective users' profile page.

#### Search
* Fix the search bar so its workable and can be used to retrive any user in the database.

#### Notification
* Create a realtime notification system for the following events:
  * Another user liked your post.
  * Another user commented on your post.
  * Another user followed you.
  
#### Discover
* Create a discover page which will display a list of most liked posts from the past three months of not followed user's who are followed by your followings.

#### Likes-Comments
* Individual comments can be liked and unliked with a visible counter that can be clickable to display a list of likers. 
  * Note - The backend required for this to happend exists already with polymorphic association between posts and comments for likes.
  
#### Password
* Change password
* More restrictions to have stronger password:
  * A minimum of eight characters.
  * At least one uppercase letter and one lowercase letter.
  * At least one number.
  * At least one special character.
    
#### Multiple media in one post
* User can upload multiple media (images or videos) in one post which can be nagivated from right to left or left to right with respective buttons on left and right side of post.

#### Video
* User can upload videos of at most three minutes long.
* Can be played or paused.
* User can seek through a video.
* User can adjust and mute/unmute volume.

#### Stories
* People can upload short video(s) of at most one and a half minute.
* User, for their own stories, will have the option when clicked will automatically pause the video (if playing) and show a list of users who watched the story over the still video.
* User will be able to navigate between stories from a given user through button on left and right side of stories.
* User will be able to navigate between different users when displaying stories through another set of buttons.
* Home page's right box will be repurposed to display following users' stories.

#### Messaging
* There will be another button on the right side of the top bar which will take them to the messaging page.
* User will be able to send and receive direct messages from other users who are following each other.
* User will be able to scroll through messages to and from a given user.
  * Only certain amount of messages will be displayed by default. Upon scrolling upward more previous messages will be downloaded and displayed.
* User will be able to scroll through a list of users with whom messages have been exchanged in the past.
  * User can click one of the users from this list to display messages between them.
