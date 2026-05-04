import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      name: String,
      phone: String,
      address: String,
      city: String,
      paymentMethod: String,
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Placed", "Packed", "Shipped", "Delivered"],
      default: "Placed",
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.virtual("id").get(function () {
  return this._id.toString();
});

orderSchema.virtual("placedAt").get(function () {
  return this.createdAt;
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    return ret;
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
