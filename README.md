# tvseries-tracker

The project is a web application for tracking TV series. It allows users to register, search for series, view series details, track watched episodes, and manage their profiles.

## Technologies
- Express.js
- MongoDB
- Mongoose
- Passport.js
- HTML/CSS
- JavaScript

## Features
The project offers the following features:

#### Homepage:
- The homepage displays a collection of TV series.
- Users can view series details by clicking on a series card.
#### Search Functionality:

- Users can search for TV series by name.
- The search function performs a case-insensitive search and displays the search results.

#### User Registration and Authentication:

- Users can register by providing their name, username, email, and password.
- Passwords are securely hashed using bcrypt before being stored.
- Registered users can log in and log out of the application.

#### User Profile:

- Each user has a profile page that displays their username and tracked series.
- Users can track and untrack series, marking episodes as watched or unwatched.
- The profile page also shows the total number of tracked series and watched episodes.

#### API Endpoints:

- The API provides endpoints for accessing TV series information and user details.
- The API allows authenticated users to retrieve specific series information and user profiles.

## Achievements
The project has accomplished the following:

- Implemented user registration and **authentication** using Passport.js with a local strategy.
- Developed routes for rendering the homepage, performing searches, and managing user registration and authentication.
- Created **views** for displaying TV series, series details, user profiles, registration, and login pages.
- Implemented tracking of TV series and watched episodes for each user.
- Integrated **flash messages** to provide feedback during the registration and login processes.
- **Configured an API** to retrieve series information and user details.

## How To Run
```
docker build -t yourusername/tv-series-tracker .
docker run -p 49160:3000 --rm -d yourusername/tv-series-tracker
```

Now the application is running on http://localhost:49160/
