import { Model } from "mongoose";

export type Ilogin = {
  email: string;
  password: string;
};

export type Iloginmodel = Model<Ilogin, Record<string, unknown>>;

export type Iloginresponse = {
  accesstoken: string;
  refreshtoken?: string;
};

export type Iaccesstoken = {
  accesstoken: string;
};
export type Ipasswordchange = {
  oldpassword: string;
  newpassword: string;
};
