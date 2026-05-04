# Shoe Shopper - Complete Development Journey

## 1. Project Planning Phase

### Idea Selection

The project idea selected was a footwear e-commerce application. Footwear was chosen because it is easy to represent visually, has clear product categories, and supports practical e-commerce features such as size, color, price, discount, wishlist, cart, checkout, orders, and admin product management.

### Feature Planning

The project was planned in modules so that each feature could be developed and tested step by step:

- Product listing
- Product detail page
- Cart system
- Wishlist system
- Checkout with fake payment
- Authentication
- Order management
- Admin dashboard
- MongoDB database integration
- User profile system

### UI Planning

The frontend was planned as a clean shopping interface. React components were used to separate the UI into smaller reusable parts. Tailwind CSS was selected for fast responsive styling. The UI included a header, hero section, category section, product cards, drawers, modals, and an admin dashboard.

### Dataset Strategy

At the beginning, sample product data was stored in frontend JSON/JavaScript files. This helped build the UI before the backend was ready. Later, the dataset was moved to MongoDB and accessed through Express APIs.

## 2. Frontend Development Phase

### React And Tailwind Setup

The frontend was created using Vite with React. Tailwind CSS was configured for utility-based styling. The frontend was structured around reusable components for better maintainability.

### Component Structure

Important components include:

- `Header`
- `ProductCard`
- `ProductListing`
- `ProductDetail`
- `CartDrawer`
- `WishlistDrawer`
- `CheckoutModal`
- `OrderHistoryDrawer`
- `AuthModal`
- `AdminDashboard`
- `Profile`

### Product Listing

The product listing was first built using local product data. Product cards showed the product image, name, brand, price, discount, and action buttons. Later, product data was fetched from the backend API.

### Product Detail

The product detail section displayed selected product information, available sizes, colors, price, description, and similar product suggestions.

### Cart System

The cart system allowed users to add products, increase or decrease quantity, remove products, and view the total amount. Initially, cart data was stored in local state and localStorage.

### Wishlist System

Wishlist allowed users to save favorite products. It used product `_id` values to add and remove items consistently.

### Admin Dashboard UI

The admin dashboard provided a form for adding and editing products and a table for existing products. It included add, update, and delete buttons connected to backend APIs.

## 3. Backend Development Phase

### Express Server Setup

The backend was created with Node.js and Express.js. The server used middleware for CORS and JSON request parsing.

### MongoDB Connection

MongoDB was connected using Mongoose. The connection string was stored in `backend/.env` as `MONGO_URI`.

### API Creation

REST APIs were created for:

- Authentication
- Products
- Orders
- User profile

Controllers were used to keep route logic organized. Routes were separated into route files for clean structure.

### Authentication System

JWT authentication was implemented. During login or registration, the backend generates a token. The frontend stores the token and sends it in:

```http
Authorization: Bearer <token>
```

Protected middleware verifies the token and attaches the logged-in user to the request.

### Password Hashing

Passwords are hashed using bcrypt before saving to MongoDB. During login, the entered password is compared with the hashed password.

### Order System

Orders are linked with the logged-in user. Each order stores customer details, ordered items, total amount, and order status.

## 4. Integration Phase

### Connecting Frontend To Backend

The frontend API service file was created to centralize all backend requests. This made it easier to call product, auth, order, and profile APIs.

### Replacing localStorage With APIs

Local data was useful in the early UI phase. During integration, product and order data were connected to MongoDB through Express APIs. Some UI states such as cart and wishlist still use localStorage for convenience.

### Handling Tokens

The JWT token is stored in localStorage after login/register. Protected requests read the token and send it in the Authorization header.

## 5. Debugging And Fixing Phase

### Common Errors Faced

Common issues during development included:

- Missing imports in React components
- API path mismatch between frontend and backend
- MongoDB connection string errors
- JWT token missing in protected requests
- Using `id` instead of MongoDB `_id`
- Form submission updating UI state without saving to database

### Fixing MongoDB Connection Issues

MongoDB issues were handled by checking `MONGO_URI`, confirming MongoDB Atlas/network access, and verifying server logs.

### Fixing React Errors

React errors were fixed by checking imports, props, component state, event handlers, and JSX syntax.

### Fixing Admin Bugs

The admin dashboard required three major fixes:

- Add product needed a POST request to `/api/products`.
- Update and delete needed MongoDB `_id`.
- Admin routes required `Authorization: Bearer <token>`.

The API helper was updated so headers are merged correctly and product responses are normalized to include `_id` on the frontend.

## 6. Testing Phase

### API Testing

APIs were tested using requests such as:

- Register user
- Login user
- Fetch products
- Add product as admin
- Update product as admin
- Delete product as admin
- Place order as logged-in user
- Fetch user orders
- Fetch user profile
- Update user profile

### End-To-End Flow Testing

The complete user journey was tested:

1. Register/login.
2. Browse products.
3. View product details.
4. Add product to cart.
5. Add product to wishlist.
6. Checkout and place order.
7. View order history.
8. Open profile and update name/password.
9. Login as admin.
10. Add, update, and delete products.
11. Refresh page and confirm data remains saved in MongoDB.

## 7. Deployment Preparation

### Environment Setup

Before deployment, environment variables should be configured:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT`

### Build Process

The frontend build command is:

```bash
npm run build
```

The backend start command is:

```bash
npm start
```

### Deployment Strategy

Recommended deployment:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

### Vercel Frontend Deployment

Deploy the `frontend` folder on Vercel. Configure the frontend API base URL for production if the backend URL changes.

### Render Backend Deployment

Deploy the `backend` folder on Render as a Node.js web service. Add environment variables in the Render dashboard.

### MongoDB Atlas

Use MongoDB Atlas for the production database. Whitelist the hosting provider IP or allow access as required for the academic demo.

## Final Outcome

The final project is a complete MERN stack footwear e-commerce application with customer shopping features, JWT authentication, MongoDB persistence, order management, user profile management, and admin product CRUD operations.
