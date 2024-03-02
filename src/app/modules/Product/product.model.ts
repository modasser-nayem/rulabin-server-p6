import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      unique: true,
    },
    model: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    brand: {
      type: Schema.ObjectId,
      ref: "Brand",
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: Schema.ObjectId,
      ref: "Subcategory",
    },
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
    active: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Product = model<TProduct>("Product", productSchema);

export default Product;
