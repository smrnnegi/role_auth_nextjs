# Role-Based Auth System

## Tech Stack

* Next.js
* MongoDB
* Mongoose
* JWT
* bcrypt

## Features

* User registration & login
* Role-based access (Super Admin, Admin, User)
* Admin can create users
* User can manage notes

## API Routes
### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Admin

* POST `/api/admin`
* GET `/api/admin`

### User

* POST `/api/user`
* GET `/api/user`

### Notes

* POST `/api/notes`
* GET `/api/notes`

## Setup

```bash
npm install
npm run dev (to run development server)
```

Create `.env.local`:

```
MONGO_URI=your_connection_string
JWT_SECRET=your_secret
```

## Auth Header

```
Authorization: Bearer <token>
```
