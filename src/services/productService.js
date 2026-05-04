import { products } from "../data/products";

export function getProducts() {
  return products;
}

export function getProductById(productId) {
  return products.find((product) => product.id === Number(productId));
}

export function getRecommendedProducts(currentProduct, limit = 3) {
  if (!currentProduct) return [];

  return products
    .filter((product) => product.id !== currentProduct.id)
    .filter(
      (product) =>
        product.category === currentProduct.category ||
        product.type === currentProduct.type ||
        product.brand === currentProduct.brand
    )
    .slice(0, limit);
}
