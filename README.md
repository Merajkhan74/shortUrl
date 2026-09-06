# 🔗 URL Shortener

A full-stack URL Shortener web application built using **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

This application allows users to create short URLs from long URLs, redirect users using the generated short URL, and track the number of visits/clicks for each shortened URL.

It also includes **User Authentication, Role-Based Authorization, Login, Signup, Logout, and Visit History tracking**.

---

## ✨ Features

### 🔗 URL Shortening

- Convert long URLs into short URLs.
- Generate a unique Short ID for every URL.
- Redirect short URLs to the original URL.

### 👤 User Authentication

- User Signup
- User Login
- User Logout
- Token-based authentication
- Authentication middleware
- Protected routes

### 🔐 Role-Based Authorization

The application supports different user roles:

- `NORMAL`
- `ADMIN`

Only authenticated users with the allowed roles can create shortened URLs.

### 📊 Click Tracking

Every time someone opens a shortened URL:

- The visit is recorded.
- The visit timestamp is stored.
- Total clicks can be calculated using the visit history.

### 🗃️ User-Specific URLs

- Users can see the URLs created by their own account.
- Each URL is associated with its creator.
- Users can track their own URL activity.

### 🎨 EJS Frontend

The project uses **EJS templates** for rendering:

- Login page
- Signup page
- Home page
- URL list
- Generated short URLs
- Click statistics

---

## 🛠️ Technologies Used

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Frontend

- HTML
- CSS
- EJS

### Authentication

- Cookies
- Token-based authentication
- Authentication middleware

### Other Packages

- `cookie-parser`
- `express-session`

> **Note:** The current authentication flow primarily uses a token stored in a cookie. `express-session` is not required if session-based authentication is not being used elsewhere in the application.

---

## 🔄 How It Works

```text
User enters a long URL
        ↓
URL Shortener generates a unique Short ID
        ↓
Short URL is saved in MongoDB
        ↓
User receives the Short URL
        ↓
Someone opens the Short URL
        ↓
Application records the visit
        ↓
User is redirected to the original URL   
