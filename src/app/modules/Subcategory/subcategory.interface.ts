import { Types } from "mongoose";

export type TSubcategory = {
  name: string;
  icon: string;
  category: Types.ObjectId;
};
