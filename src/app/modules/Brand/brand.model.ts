import { Schema, model } from "mongoose";
import { TBrand } from "./brand.interface";

const brandSchema = new Schema<TBrand>({
  name: {
    type: String,
    unique: true,
  },
  icon: {
    type: String,
  },
});

const Brand = model<TBrand>("Brand", brandSchema);
export default Brand;
