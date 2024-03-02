import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    unique: true,
  },
  icon: {
    type: String,
  },
});

const Category = model<TCategory>("Category", categorySchema);
export default Category;
