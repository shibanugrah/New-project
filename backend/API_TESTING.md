# Shoe Shopper Backend API Testing

Use this after MongoDB is running and dependencies are installed.

## 1. Install Dependencies

```bash
cd backend
npm install
```

## 2. Start MongoDB

Local MongoDB URI used by default:

```env
MONGO_URI=mongodb://127.0.0.1:27017/shoe-shopper
```

## 3. Seed Products

```bash
npm run seed
```

## 4. Start Backend

```bash
npm run dev
```

API base URL:

```text
http://localhost:5000
```

## 5. Test Product API

```bash
curl http://localhost:5000/api/products
```

## 6. Register User

```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Demo User\",\"email\":\"user@test.com\",\"password\":\"123456\"}"
```

## 7. Register Admin

```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin User\",\"email\":\"admin@test.com\",\"password\":\"123456\",\"role\":\"admin\"}"
```

Copy the returned `token` for admin-only product create/delete routes.

## 8. Create Product As Admin

```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" ^
  -d "{\"name\":\"Demo Shoe\",\"brand\":\"Metro\",\"category\":\"Men\",\"type\":\"Sneakers\",\"price\":1999,\"oldPrice\":2499,\"discount\":20,\"description\":\"Demo product\",\"image\":\"https://images.unsplash.com/photo-1542291026-7eec264c27ff\",\"sizes\":[7,8,9],\"colors\":[\"Black\"]}"
```

## 9. Create Order As User

Use a normal user token.

```bash
curl -X POST http://localhost:5000/api/orders ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_USER_TOKEN" ^
  -d "{\"customer\":{\"name\":\"Demo User\",\"phone\":\"9999999999\",\"address\":\"Test Address\",\"city\":\"Mumbai\",\"paymentMethod\":\"card\"},\"items\":[{\"name\":\"Demo Shoe\",\"brand\":\"Metro\",\"image\":\"https://images.unsplash.com/photo-1542291026-7eec264c27ff\",\"price\":1999,\"quantity\":1}],\"total\":1999}"
```

## 10. Get User Orders

```bash
curl http://localhost:5000/api/orders/my-orders ^
  -H "Authorization: Bearer YOUR_USER_TOKEN"
```
