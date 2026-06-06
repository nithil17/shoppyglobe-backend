# ShoppyGlobe Backend API

ShoppyGlobe Backend is a RESTful API built with Node.js, Express.js, MongoDB, Mongoose, and JWT authentication. It provides product management, cart management, and user authentication for an e-commerce application.

The project demonstrates MongoDB CRUD operations, JWT-based authentication, protected routes, validation, and API testing with Thunder Client.

## Features

- View all products
- View product details by ID
- Create, update, and delete products
- Add products to the logged-in user's cart
- Update cart item quantity
- Remove products from cart
- User registration and login
- JWT token generation
- Protected cart routes
- MongoDB database integration
- API testing using Thunder Client

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Thunder Client

## Project Structure

```text
shoppyglobe-backend/
|-- config/
|   `-- db.js
|-- middleware/
|   `-- authMiddleware.js
|-- models/
|   |-- Product.js
|   |-- Cart.js
|   `-- User.js
|-- routes/
|   |-- productRoutes.js
|   |-- cartRoutes.js
|   `-- userRoutes.js
|-- .env
|-- package.json
|-- server.js
`-- README.md
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd shoppyglobe-backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:5000
```

## Authentication

Protected cart routes require this header:

```http
Authorization: Bearer <jwt_token>
```

Missing or invalid tokens return `401 Unauthorized`.

## User Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/register` | Register a new user |
| POST | `/login` | Login and receive a JWT token |

## Product Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/products` | Fetch all products |
| GET | `/products/:id` | Fetch a product by ID |
| POST | `/products` | Create a product |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |

Product request body:

```json
{
  "name": "Product name",
  "price": 999,
  "description": "Product description",
  "stockQuantity": 10
}
```

## Cart Routes

All cart routes are protected and scoped to the logged-in user.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/cart` | Fetch the logged-in user's cart |
| POST | `/cart` | Add or update a product in the logged-in user's cart |
| PUT | `/cart/:id` | Update cart item quantity |
| DELETE | `/cart/:id` | Remove a cart item |

Cart item request body:

```json
{
  "productId": "PRODUCT_OBJECT_ID",
  "quantity": 1
}
```

## Validation And Error Handling

The API validates required fields, MongoDB ObjectIds, product existence, positive cart quantities, and stock availability.

Common responses:

| Status | Meaning |
| --- | --- |
| 400 | Invalid request data |
| 401 | Missing or invalid JWT token |
| 404 | Resource not found |
| 500 | Server error |

## Database Collections

- Products
- Cart
- Users

## Testing

All APIs should be tested using Thunder Client:

- Product CRUD APIs
- Cart CRUD APIs
- User registration
- User login
- JWT protected routes

Include screenshots for MongoDB product/cart collections and protected route behavior in the submitted repository documentation.

## Learning Outcomes

- REST API development
- Express routing
- MongoDB CRUD operations
- Mongoose models
- JWT authentication
- Middleware implementation
- Error handling and validation
- API testing using Thunder Client
