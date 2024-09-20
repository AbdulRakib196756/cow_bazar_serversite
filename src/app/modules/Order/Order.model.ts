import { model, Schema } from "mongoose";
import { Iorder, IorderMode } from "./Order.interface";

const Orderschema = new Schema<Iorder, IorderMode>({
  cow: Schema.Types.ObjectId,
  buyer: Schema.Types.ObjectId,
});

export const Order = model<Iorder, IorderMode>("order", Orderschema);
