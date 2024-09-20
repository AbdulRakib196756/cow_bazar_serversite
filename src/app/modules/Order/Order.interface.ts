import { Model, Types } from "mongoose";

export type Iorder = {
  cow: Types.ObjectId;
  buyer: Types.ObjectId;
};

export type IorderMode = Model<Iorder, Record<string, unknown>>;
