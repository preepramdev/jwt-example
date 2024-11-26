# JWT Example Project

A simple Node.js project demonstrating JWT-based authentication with features like token expiration, refresh tokens, and role-based access control.

## Features
- User login with token generation (access and refresh tokens).
- Protected routes that require authentication.
- Role-based access control (e.g., Admin and User roles).
- Token expiration handling.
- Refresh tokens for renewing access tokens.
- Logout to revoke refresh tokens.
- Public route accessible without authentication.

## Getting Started

### Prerequisites
- Node.js installed on your system.
- A tool like Postman or Curl to test the API.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/preepramdev/jwt-example.git
   cd jwt-example
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   npm start
   ```
4. The server will start on:
   ```
   http://localhost:3000
   ```

## API Endpoints

### 1. Public Route
- **Endpoint:** `GET /`
- **Description:** A public route accessible without authentication.
- **Response:**
  ```json
  {
    "message": "Welcome to the public API!"
  }
  ```

### 2. Login
- **Endpoint:** `POST /auth/login`
- **Description:** Logs in a user and returns an access token and refresh token.
- **Request Body:**
  ```json
  {
    "username": "john",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "access_token_here",
    "refreshToken": "refresh_token_here"
  }
  ```

### 3. Refresh Token
- **Endpoint:** `POST /auth/token`
- **Description:** Generates a new access token using a refresh token.
- **Request Body:**
  ```json
  {
    "refreshToken": "refresh_token_here"
  }
  ```
- **Response:**
  ```json
  {
    "token": "new_access_token_here"
  }
  ```

### 4. Logout
- **Endpoint:** `POST /auth/logout`
- **Description:** Logs out the user by revoking the refresh token.
- **Request Body:**
  ```json
  {
    "refreshToken": "refresh_token_here"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### 5. Access Protected Routes
#### Admin Route
- **Endpoint:** `GET /users`
- **Description:** Requires admin access. Lists all users.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer access_token_here"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Here is the user list!"
  }
  ```

#### User Profile
- **Endpoint:** `GET /users/profile`
- **Description:** Allows users to view their profile.
- **Headers:**
  ```json
  {
    "Authorization": "Bearer access_token_here"
  }
  ```
- **Response:**
  ```json
  {
    "id": "user_id_here",
    "username": "username_here",
    "role": "user_role_here"
  }
  ```

## Testing
1. Use Postman, Curl, or any HTTP client to test the endpoints.
2. Log in to receive an access token and refresh token.
3. Use the access token to call protected routes (`/users` or `/users/profile`).
4. Refresh the access token if it expires using `/auth/token`.
5. Revoke the refresh token using `/auth/logout`.

## Example Usage with Curl
1. Public Route:
   ```bash
   curl -X GET http://localhost:3000/
   ```
2. Login:
   ```bash
   curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "john", "password": "password123"}'
   ```
3. Access Admin Route:
   ```bash
   curl -X GET http://localhost:3000/users -H "Authorization: Bearer access_token_here"
   ```
4. Refresh Token:
   ```bash
   curl -X POST http://localhost:3000/auth/token -H "Content-Type: application/json" -d '{"refreshToken": "refresh_token_here"}'
   ```
5. Logout:
   ```bash
   curl -X POST http://localhost:3000/auth/logout -H "Content-Type: application/json" -d '{"refreshToken": "refresh_token_here"}'
   ```

## Built With
- **Express:** Fast, unopinionated web framework for Node.js.
- **jsonwebtoken:** For signing and verifying JSON Web Tokens.
- **body-parser:** Middleware to parse incoming request bodies.
- **dotenv:** Loads environment variables from a .env file.
