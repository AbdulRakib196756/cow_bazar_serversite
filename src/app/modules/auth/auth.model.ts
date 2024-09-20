import { model, Schema } from "mongoose";
import { Ilogin, Iloginmodel } from "./auth.interface";

const loginschema = new Schema<Ilogin, Iloginmodel>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Login = model<Ilogin, Iloginmodel>("Login", loginschema);
