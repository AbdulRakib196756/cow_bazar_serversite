import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: IUser): Promise<IUser> => {
  const data = await User.create(payload);
  return data;
};
const getalluser = async (): Promise<IUser[] | null> => {
  const data = await User.find();
  return data;
};

const getsingleUser = async (id: string): Promise<IUser | null> => {
  const data = await User.findById(id);
  return data;
};

export const userservice = {
  createUser,
  getalluser,
  getsingleUser,
};
