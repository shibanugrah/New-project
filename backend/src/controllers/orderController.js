import Order from "../models/Order.js";

export async function createOrder(req, res) {
  try {
    const { customer, items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item",
      });
    }

    const orderItems = items.map((item) => {
      const product = item.product || item;

      return {
        productId: product.id || product._id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        quantity: item.quantity || 1,
      };
    });

    const order = await Order.create({
      user: req.user._id,
      customer,
      items: orderItems,
      total,
      status: "Placed",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
}

export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
}

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
}
