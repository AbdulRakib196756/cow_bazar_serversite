import httpStatus from "http-status";
import ApiError from "../../../error/apiError";
import { User } from "../User/user.model";
import {
  Iaccesstoken,
  Ilogin,
  Iloginresponse,
  Ipasswordchange,
} from "./auth.interface";
import { jwthelpers } from "../../../helpers/jwttokenhelpers";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";

const loginservice = async (payload: Ilogin): Promise<Iloginresponse> => {
  const { email, password } = payload;
  const userExist = await User.Isuserexist(email);

  if (!userExist) {
    throw new ApiError(httpStatus.FORBIDDEN, "user doesnt exist");
  }

  if (
    userExist.password &&
    !(await User.Ispasswordmatch(password, userExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "wrong password");
  }
  const { role } = userExist;
  const accesstoken = jwthelpers.createtoken(
    { email, role },
    config.token as Secret,
    config.tokenexpires as string
  );
  const refreshtoken = jwthelpers.createtoken(
    { email, role },
    config.refreshtoken as Secret,
    config.refreshtokenexpires as string
  );

  return {
    accesstoken,
    refreshtoken,
  };
};
const refreshtokenservice = async (payload: string): Promise<Iaccesstoken> => {
  let varifiedtoken = null;

  try {
    varifiedtoken = jwthelpers.verifeidtoken(
      payload,
      config.refreshtoken as Secret
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "invalid token");
  }
  const { userid } = varifiedtoken;

  const Isuserexist = await User.Isuserexist(userid);
  if (!Isuserexist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  const newaccesstoken = jwthelpers.createtoken(
    { email: Isuserexist.email, role: Isuserexist.role },
    config.token as Secret,
    config.tokenexpires as string
  );

  return {
    accesstoken: newaccesstoken,
  };
};

const changepassword = async (
  user: JwtPayload | null,
  data: Ipasswordchange
): Promise<void> => {
  const userexist = await User.findOne(user?.id);

  const { oldpassword, newpassword } = data;

  if (!userexist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  if (
    userexist.password &&
    !(await User.Ispasswordmatch(oldpassword, userexist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "old password is incorrect");
  }

  userexist.password = newpassword;

  userexist.save();
};
export const authservice = {
  loginservice,
  refreshtokenservice,
  changepassword,
};
