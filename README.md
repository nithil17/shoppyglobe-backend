# ShoppyGlobe Backend API

## Project Overview

ShoppyGlobe Backend is a RESTful API built using **Node.js**, **Express.js**, and **MongoDB**. It provides product management, cart management, and user authentication functionalities for an e-commerce application.

The project demonstrates CRUD operations, MongoDB integration, JWT-based authentication, and route protection using middleware.

---

## Features

* View all products
* View product details by ID
* Add products to cart
* Update cart quantity
* Remove products from cart
* User registration
* User login
* JWT token generation
* Protected cart routes using authentication middleware
* MongoDB database integration
* API testing using Thunder Client

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Thunder Client

---

## Project Structure

```
shoppyglobe-backend/
│
├── config/
│   └── db.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── Product.js
│   ├── Cart.js
│   └── User.js
│
├── routes/
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── userRoutes.js
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd shoppyglobe-backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file in the project root.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start Development Server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## API Endpoints

### Product APIs

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | /products     | Get all products  |
| GET    | /products/:id | Get product by ID |

---

### Cart APIs (Protected)

| Method | Endpoint  | Description              |
| ------ | --------- | ------------------------ |
| GET    | /cart     | Get cart items           |
| POST   | /cart     | Add product to cart      |
| PUT    | /cart/:id | Update cart quantity     |
| DELETE | /cart/:id | Remove product from cart |

---

### User APIs

| Method | Endpoint  | Description                       |
| ------ | --------- | --------------------------------- |
| POST   | /register | Register new user                 |
| POST   | /login    | Login user and generate JWT token |

---

## Authentication

Protected routes require a JWT token.

Add the following header:

```
Authorization: Bearer <your_jwt_token>
```

If no token is provided, the API returns:

```
401 Unauthorized
```

---

## Testing

All APIs were tested using Thunder Client.

The project includes testing for:

* Product APIs
* Cart CRUD APIs
* User Registration
* User Login
* JWT Protected Routes

---

## Database

MongoDB Collections:

* Products
* Cart
* Users

---

## Learning Outcomes

This project demonstrates:

* REST API development
* Express routing
* MongoDB CRUD operations
* Mongoose models
* JWT authentication
* Middleware implementation
* Error handling
* API testing using Thunder Client

---


Node.js | Express.js | MongoDB Backend Project
