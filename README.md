# Shoe Shopper - MERN E-Commerce Project

Shoe Shopper is a full-stack footwear e-commerce web application built with React, Tailwind CSS, Vite, Node.js, Express, MongoDB, Mongoose, and JWT authentication. The system supports customer shopping workflows and admin product management with persistent MongoDB storage.

## Features

- Product listing with category, brand, type, price, and discount details
- Product detail view with similar product suggestions
- Cart management with quantity controls
- Wishlist management
- Checkout flow with fake payment option
- User registration and login with JWT
- User profile with name/password update and order history
- Order placement and protected order history
- Admin dashboard for adding, updating, and deleting products
- MongoDB persistence using Mongoose schemas
- Protected admin routes using JWT and role-based authorization

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Tools | npm, Nodemon |

## Folder Structure

```text
New project/
  backend/
    server.js
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      seed/
      utils/
  frontend/
    src/
      components/
      data/
      services/
      styles/
      App.jsx
      main.jsx
  README.md
  PROJECT_DOCUMENTATION.md
  DEVELOPMENT_JOURNEY.md
```

## Installation

1. Clone or open the project folder.
2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running The Project

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Build frontend for production:

```bash
cd frontend
npm run build
```

Optional product seeding:

```bash
cd backend
npm run seed
```

## API Overview

### Auth

- `POST /api/auth/register` - Register user/admin
- `POST /api/auth/login` - Login and receive JWT token

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Add product, admin only
- `PUT /api/products/:id` - Update product, admin only
- `DELETE /api/products/:id` - Delete product, admin only

### Orders

- `POST /api/orders` - Place order, protected
- `GET /api/orders/my-orders` - Get logged-in user's orders
- `GET /api/orders` - Get all orders, admin only

### User Profile

- `GET /api/users/profile` - Get logged-in user's profile
- `PUT /api/users/profile` - Update name/password

Protected routes require:

```http
Authorization: Bearer <token>
```

## Screenshots

Add screenshots in this section before final submission:

- Home page screenshot
- Product listing screenshot
- Product detail screenshot
- Cart screenshot
- Checkout screenshot
- Login/register screenshot
- Profile screenshot
- Admin dashboard screenshot
- Order history screenshot

## Deployment Notes

- Frontend can be deployed on Vercel or Netlify.
- Backend can be deployed on Render, Railway, or similar Node.js hosting.
- MongoDB Atlas can be used for cloud database hosting.
- Add production environment variables in the backend hosting dashboard.
