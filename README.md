# MERN Authentication

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that implements user authentication. It includes features such as user registration, login, and authentication using JWT (JSON Web Token).

## Features

- **User Registration:** Create a new user account.
- **User Login:** Authenticate a user and issue a JWT token.
- **Protected Routes:** Access control for protected routes using JWT.
- **User Profile:** Display user-specific information.

## Technologies Used

- **MongoDB:** NoSQL database for storing user information.
- **Express.js:** Backend framework for building RESTful APIs.
- **React:** Frontend library for building user interfaces.
- **Node.js:** JavaScript runtime for the backend server.
- **JWT:** JSON Web Tokens for secure authentication.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js
- npm (Node package manager) or yarn
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/chandanbag1999/Mern-Authentication.git
   ```

2. Navigate to the project directory:

   ```sh
   cd Mern-Authentication
   ```

3. Install the dependencies for the backend:

   ```sh
   cd api
   npm install
   ```

   or

   ```sh
   cd api
   yarn install
   ```

4. Install the dependencies for the frontend:

   ```sh
   cd ../client
   npm install
   ```

   or

   ```sh
   cd ../client
   yarn install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

2. Replace `your_mongodb_connection_string` with your actual MongoDB connection string.
3. Replace `your_jwt_secret` with a secret key for JWT.

### Running the Application

1. Start the backend server:

   ```sh
   cd api
   npm start
   ```

   or

   ```sh
   cd api
   yarn start
   ```

2. Start the frontend development server:

   ```sh
   cd ../client
   npm start
   ```

   or

   ```sh
   cd ../client
   yarn start
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser. The backend server will run on [http://localhost:5000](http://localhost:5000).

## Folder Structure

- `backend`: Contains the backend code
  - `controllers`: Request handlers for different routes
  - `models`: Mongoose models for MongoDB collections
  - `routes`: API routes
  - `middleware`: Custom middleware functions (e.g., for authentication)
  - `server.js`: Entry point of the backend application

- `frontend`: Contains the frontend code
  - `src`
    - `components`: Reusable React components
    - `pages`: React components for different pages
    - `App.js`: Main application component
    - `index.js`: Entry point of the frontend application

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Chandan Bag - [chandanbag1999](https://github.com/chandanbag1999)

Email - cbag67612@gmail.com

LinkedIn - [www.linkedin.com/in/cbag-98](www.linkedin.com/in/cbag-98
)

Project Link: [https://github.com/chandanbag1999/Mern-Authentication](https://github.com/chandanbag1999/Mern-Authentication)

Visite App: [Auth App](https://mern-authentication-y1jb.onrender.com)
```
