import { Model } from "mongoose";

type IUsername = {
  firstname: string;
  lastname: string;
};

export type IUser = {
  password: string;
  role: "seller" | "buyer";
  name: IUsername;
  Phonenumber: string;
  email: string;
  Adress: string;
  Budget?: number;
  Income?: number;
};

export type IuserModel = {
  Isuserexist(
    email: string
  ): Promise<Pick<IUser, "email" | "password" | "role">>;
  Ispasswordmatch(givenpassword: string, oldpassword: string): Promise<boolean>;
} & Model<IUser>;
