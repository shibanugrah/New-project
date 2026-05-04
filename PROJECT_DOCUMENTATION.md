# Shoe Shopper - MCA Project Documentation

## 1. Introduction

Shoe Shopper is a MERN stack e-commerce application developed for online footwear shopping. The application provides a complete shopping experience where users can browse products, view product details, add items to cart and wishlist, place orders, manage their profile, and track order history. The project also includes an admin dashboard for managing products stored in MongoDB.

The project demonstrates practical use of React for frontend development, Express.js for REST API creation, MongoDB for database storage, Mongoose for schema modeling, and JWT for secure authentication.

## 2. Problem Statement

Traditional small footwear businesses often depend on manual sales, limited product visibility, and offline order management. Customers may not have a simple digital platform to view products, compare footwear options, save favorite items, or place orders. Administrators also need a convenient way to add, update, and delete products without directly accessing the database.

This project solves the problem by creating a full-stack e-commerce system with customer-facing shopping features and admin-facing product management features.

## 3. Objectives

- To build a responsive footwear e-commerce website.
- To implement product listing and product detail views.
- To provide cart, wishlist, checkout, and order history features.
- To implement JWT-based user authentication.
- To store products, users, and orders in MongoDB.
- To provide an admin dashboard for product CRUD operations.
- To add a user profile system for viewing and updating account details.
- To connect frontend and backend using REST APIs.

## 4. System Architecture

The application follows a client-server architecture.

```text
User/Admin
   |
   v
React + Tailwind Frontend
   |
   | REST API requests with JSON and JWT token
   v
Node.js + Express Backend
   |
   | Mongoose queries
   v
MongoDB Database
```

### Frontend Flow

The React frontend contains reusable components for header, product cards, product listing, product detail, cart drawer, wishlist drawer, checkout modal, order history, profile, authentication, and admin dashboard. API calls are handled through a common service file.

### Backend Flow

The Express backend receives API requests, validates protected routes using JWT middleware, executes controller logic, communicates with MongoDB through Mongoose models, and returns JSON responses to the frontend.

## 5. Technology Stack Explanation

### React

React is used to build the interactive user interface with component-based development.

### Tailwind CSS

Tailwind CSS is used for responsive and utility-first styling.

### Vite

Vite provides a fast development server and optimized production build for the React frontend.

### Node.js

Node.js provides the runtime environment for the backend server.

### Express.js

Express.js is used to create REST APIs for authentication, products, orders, and users.

### MongoDB

MongoDB stores users, products, and orders as flexible JSON-like documents.

### Mongoose

Mongoose defines schemas, validations, and database models for MongoDB collections.

### JWT

JWT is used to protect routes and identify logged-in users.

## 6. Database Design

### User Schema

| Field | Type | Description |
| --- | --- | --- |
| name | String | User's full name |
| email | String | Unique email address |
| password | String | Hashed password |
| role | String | user or admin |
| timestamps | Date | Created and updated time |

### Product Schema

| Field | Type | Description |
| --- | --- | --- |
| name | String | Product name |
| brand | String | Product brand |
| category | String | Men, Women, or Kids |
| type | String | Footwear type |
| price | Number | Selling price |
| oldPrice | Number | Previous price |
| discount | Number | Discount percentage |
| description | String | Product details |
| image | String | Product image URL |
| sizes | Array | Available sizes |
| colors | Array | Available colors |
| timestamps | Date | Created and updated time |

### Order Schema

| Field | Type | Description |
| --- | --- | --- |
| user | ObjectId | Reference to User |
| customer | Object | Customer delivery/payment details |
| items | Array | Ordered product items |
| total | Number | Total order amount |
| status | String | Placed, Packed, Shipped, or Delivered |
| timestamps | Date | Created and updated time |

## 7. API Design

### Authentication APIs

- `POST /api/auth/register`: Creates a new account and returns a JWT.
- `POST /api/auth/login`: Authenticates user credentials and returns a JWT.

### Product APIs

- `GET /api/products`: Fetches all products.
- `POST /api/products`: Adds a product. Admin only.
- `PUT /api/products/:id`: Updates a product. Admin only.
- `DELETE /api/products/:id`: Deletes a product. Admin only.

### Order APIs

- `POST /api/orders`: Places an order for the logged-in user.
- `GET /api/orders/my-orders`: Fetches orders of the logged-in user.
- `GET /api/orders`: Fetches all orders for admin users.

### User APIs

- `GET /api/users/profile`: Fetches logged-in user's profile.
- `PUT /api/users/profile`: Updates logged-in user's name and password.

## 8. Features Explanation

### Product Listing

Users can browse products with details such as name, brand, price, discount, category, type, sizes, and colors.

### Product Detail

Each product can be viewed in detail with product description and similar product suggestions.

### Cart System

Users can add products to cart, increase or decrease quantity, remove items, and proceed to checkout.

### Wishlist System

Users can save favorite products in the wishlist and later move them to the cart.

### Checkout With Fake Payment

The checkout form collects customer and payment details. The fake payment flow is suitable for academic demonstration without real payment gateway integration.

### Order System

Orders are stored in MongoDB and linked with the logged-in user. Users can view their order history.

### Authentication

Users can register and login. JWT tokens are stored on the frontend and sent through the Authorization header for protected API calls.

### User Profile

The profile system shows name, email, role, and order history. Users can update their name and password.

### Admin Dashboard

Admin users can add, update, and delete products. Admin APIs are protected using JWT and role-based authorization.

## 9. Screenshots

Add final screenshots before submission:

- Home page
- Product listing
- Product detail
- Cart drawer
- Wishlist drawer
- Checkout modal
- Login/register modal
- User profile page
- Order history
- Admin dashboard
- MongoDB collections

## 10. Future Scope

- Real payment gateway integration using Razorpay or Stripe.
- Product search with backend filters.
- Product ratings and reviews.
- Address book management.
- Admin order status updates.
- Image upload using Cloudinary.
- Email notifications for orders.
- Deployment with CI/CD pipeline.
- Analytics dashboard for admin.

## 11. Conclusion

Shoe Shopper successfully implements a complete MERN stack e-commerce workflow. The project includes frontend UI, backend APIs, MongoDB integration, JWT authentication, order processing, profile management, and admin product management. It demonstrates important full-stack development concepts suitable for an MCA academic project and can be extended into a production-ready e-commerce platform.
