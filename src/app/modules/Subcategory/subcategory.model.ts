import { Schema, model } from "mongoose";
import { TSubcategory } from "./subcategory.interface";

const subcategorySchema = new Schema<TSubcategory>({
  name: {
    type: String,
    unique: true,
  },
  icon: {
    type: String,
  },
  category: {
    type: Schema.ObjectId,
    ref: "Category",
  },
});

const Subcategory = model<TSubcategory>("Subcategory", subcategorySchema);
export default Subcategory;
