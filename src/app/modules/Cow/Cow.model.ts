import { model, Schema } from "mongoose";
import { Icow, IcowModel } from "./Cow.interface";

const Cowschema = new Schema<Icow, IcowModel>({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    enum: [
      "Dhaka",
      "Chattogram",
      "Barishal",
      "Rajshahi",
      "Sylhet",
      "Comilla",
      "Rangpur",
      "Mymensingh",
    ],
  },

  breed: {
    type: String,
    enum: [
      "Brahman",
      "Nellore",
      "Sahiwal",
      "Gir",
      "Indigenous",
      "Tharparkar",
      "Kankrej",
    ],
  },
  weight: {
    type: Number,
    required: true,
  },

  label: {
    type: String,
    enum: ["forsale", "soldout"],
  },

  category: {
    type: String,
    enum: ["Dairy", "Beef", "Dual Purpose"],
  },

  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Cow = model<Icow, IcowModel>("Cow", Cowschema);
