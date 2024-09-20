import { model, Schema } from "mongoose";
import { IUser, IuserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const Userschema = new Schema<IUser, IuserModel>(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["seller", "buyer"],
      required: true,
    },

    name: {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
    },
    Phonenumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    Adress: {
      type: String,
      required: true,
    },
    Budget: {
      type: Number,
      default: 0,
    },
    Income: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

Userschema.statics.Isuserexist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne({ email }, { email: 1, password: 1, role: 1 });
};
Userschema.statics.Ispasswordmatch = async function (
  givenpassword: string,
  oldpassword: string
): Promise<boolean> {
  return bcrypt.compare(givenpassword, oldpassword);
};
// password hashing

Userschema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});

export const User = model<IUser, IuserModel>("User", Userschema);
