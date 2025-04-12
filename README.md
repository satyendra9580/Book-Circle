# BookCircle - Peer-to-Peer Book Exchange Portal

BookCircle is a full-stack web application that connects book owners with book seekers, allowing users to exchange, rent, or give away books within their community.

## Features

- **User Accounts**: Register as a Book Owner or Book Seeker
- **Book Listings**: Owners can add, edit, and delete book listings
- **Book Discovery**: Search and filter books by title, genre, and location
- **Book Status**: Mark books as Available, Rented, or Exchanged
- **Responsive UI**: Mobile-friendly design works on all devices

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API communication

### Backend
- Node.js
- Express.js
- MongoDB for data storage
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js 
- MongoDB 

### Installation

1. Clone the repository:
   ```
   git clone <link>
   cd bookcircle
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the backend directory with:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd ../frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

### As a Book Owner
1. Register with the "Owner" role
2. Add books to your collection
3. Manage book status (available, rented, exchanged)
4. Edit or remove book listings

### As a Book Seeker
1. Register with the "Seeker" role
2. Browse available books
3. Filter books by title, genre, or location
4. Contact book owners to arrange exchanges

## Project Structure

```
bookcircle/
├── backend/              # Backend Node.js/Express server
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middlewares/      # Express middlewares
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   └── server.js         # Entry point
│
└── frontend/             # Frontend React application
    ├── public/           # Static files
    └── src/              # React source files
        ├── components/   # Reusable components
        ├── context/      # React context (auth)
        ├── pages/        # Page components
        └── utils/        # Utility functions
```

## References

I took a little help from GitHub Copilot for building the frontend, and whenever I was unable to solve an error, I took help from ChatGPT.