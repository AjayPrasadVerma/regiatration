# Web App with Node.js, MongoDB, and JWT Authentication

This is a web application built using Node.js, MongoDB, and JWT authentication. It provides a RESTful API for performing CRUD (Create, Read, Delete) operations on user details.

## Features

- User authentication using JWT (JSON Web Tokens)
- User registration and login
- Create, read, and delete user details
- Secure API endpoints with authentication middleware

## Technologies Used

- Node.js: A JavaScript runtime environment for server-side development.
- Express.js: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing user details.
- Mongoose: An object modeling library for MongoDB and Node.js.
- JSON Web Tokens (JWT): A standard for secure authentication and authorization.
- Bcrypt: A library for password hashing and salting.

## Installation

1. Clone this repository to your local machine.

   ```shell
   git clone https://github.com/AjayPrasadVerma/registration.git
   ```

2. Navigate to the project directory.

   ```shell
   cd your-repo
   ```

3. Install the dependencies using npm (Node Package Manager).

   ```shell
   npm install
   ```

4. Configure the environment variables.

   - Create a `.env` file in the root directory.
   - Provide the necessary environment variables:

     ```plaintext
     PORT=1000
     MONGODB_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```

5. Start the application.

   ```shell
   npm start
   ```

6. The application should now be running on `http://localhost:1000`.

## API Documentation

### Authentication

#### Register a User

- **Endpoint:** `POST /signup`
- **Request Body:**

  ```json
  {
    "username": "example@gmail.com",
    "password": "secretpassword"
  }
  ```

- **Response:**

  ```json
  {
    "message": "Successfully Signup please login!."
  }
  ```

#### Login

- **Endpoint:** `POST /login`
- **Request Body:**

  ```json
  {
    "username": "example@gmail.com",
    "password": "secretpassword"
  }
  ```

- **Response:**

  ```json
  {
    "token": "<jwt-token>"
  }
  ```

### User Details

#### Get User Details

- **Endpoint:** `GET /user`
- **Response:**

  ```json
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "Date of Birth" : --/--/----,
      "Age": "--",
      "Gender": "----",
      "Country": "----",
      "State": "-----",
      "City" : "-------"
    }

  ```

#### Create a User Detail

- **Endpoint:** `POST /user`
- **Request Body:**

  ```json
  {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "Date of Birth" : --/--/----,
      "Age": "--",
      "Gender": "----",
      "Country": "----",
      "State": "-----",
      "City" : "-------"
  }
  ```

- **Response:**

  ```json
  {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "Date of Birth" : --/--/----,
      "Age": "--",
      "Gender": "----",
      "Country": "----",
      "State": "-----",
      "City" : "-------"
  }
  ```

#### Delete a User Detail

- **Endpoint:** `DELETE /api/user/delete`
- **Response:**

  ```json
  {
    "message": "User deleted successfully."
  }
  ```

## Contribution

Contributions are welcome! If you find any issues or want to enhance the project, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to customize the content according to your project's specific requirements. The `README.md` file serves as a detailed guide for developers to understand your web app, its features, how to install it, and how to use its API endpoints.

Make sure to update the installation steps, API endpoints, and any other relevant information specific to your project.
