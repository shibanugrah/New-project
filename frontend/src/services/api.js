const API_BASE_URL = "http://localhost:5000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

function normalizeProduct(product) {
  return product ? { ...product, _id: product._id || product.id } : product;
}

function normalizeProducts(products) {
  return Array.isArray(products) ? products.map(normalizeProduct) : products;
}

function getAuthHeader() {
  const token = localStorage.getItem("token");

  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getProductsApi() {
  return request("/products").then(normalizeProducts);
}

export function createProductApi(product) {
  return request("/products", {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(product),
  }).then(normalizeProduct);
}

export function updateProductApi(product) {
  return request(`/products/${product._id}`, {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(product),
  }).then(normalizeProduct);
}

export function deleteProductApi(productId) {
  return request(`/products/${productId}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
}

export function registerApi(userData) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export function loginApi(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function createOrderApi(orderData) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export function getMyOrdersApi() {
  return request("/orders/my-orders");
}

export function getAllOrdersApi() {
  return request("/orders");
}

export function getProfileApi() {
  return request("/users/profile");
}

export function updateProfileApi(profileData) {
  return request("/users/profile", {
    method: "PUT",
    headers: getAuthHeader(),
    body: JSON.stringify(profileData),
  });
}
