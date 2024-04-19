import { Types } from "mongoose";
import { OrderStatus } from "./order.constant";

export type TOrderProduct = {
  title: string;
  price: number;
  quantity: number;
  image: string;
  product: Types.ObjectId;
};

type TOrderStatusKey = keyof typeof OrderStatus;
export type TOrderStatus = (typeof OrderStatus)[TOrderStatusKey];

export type TOrder = {
  id: string;
  user: Types.ObjectId;
  shippingInfo: {
    country: string;
    city: string;
    state: string;
    pinCode: string;
    localArea: string;
  };
  productInfo: TOrderProduct[];
  totalItem: number;
  paymentInfo: {
    status: string;
    method: string;
    paidAt: Date;
  };
  status?: TOrderStatus;
  deliveredAt?: Date;
};
