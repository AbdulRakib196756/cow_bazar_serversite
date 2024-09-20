import { Model, Types } from "mongoose";
import { IUser } from "../User/user.interface";

export type Icow = {
  name: string;

  age: number;

  price: number;

  location:
    | "Dhaka"
    | "Chattogram"
    | "Barishal"
    | "Rajshahi"
    | "Sylhet"
    | "Comilla"
    | "Rangpur"
    | "Mymensingh";

  breed:
    | "Brahman"
    | "Nellore"
    | "Sahiwal"
    | "Gir"
    | "Indigenous"
    | "Tharparkar"
    | "Kankrej";

  weight: number;

  label: "forsale" | "soldout";

  category: "Dairy" | "Beef" | "Dual Purpose";

  seller: Types.ObjectId | IUser;
};

export type IcowModel = Model<Icow, Record<string, unknown>>;

export type Icowfilters = {
  searchTerm?: string;
  breed?: string;
  location?: string;
  category?: string;
  maxprice?: number;
  minprice?: number;
};
