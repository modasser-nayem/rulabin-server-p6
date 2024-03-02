import { Types } from "mongoose";

export interface TProduct {
  id: string;
  title: string;
  model: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  brand: Types.ObjectId;
  category: Types.ObjectId;
  subcategory?: Types.ObjectId;
  user: Types.ObjectId;
  active?: boolean;
  isDeleted?: boolean;
}
