import { Request, Response } from "express";
import catchAsync from "../../../shared/catchasych";
import Sendresponse from "../../../shared/sendresponse";

import httpStatus from "http-status";
import { authservice } from "./auth.service";
import config from "../../../config";
import { Iaccesstoken, Iloginresponse } from "./auth.interface";

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;

  const result = await authservice.loginservice(data);
  const { accesstoken, refreshtoken } = result;
  const cookieoption = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshtoken", refreshtoken, cookieoption);

  Sendresponse<string>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "login success",
    data: accesstoken,
  });
});

const refreshtoken = catchAsync(async (req: Request, res: Response) => {
  const { refreshtoken } = req.cookies;

  const result = await authservice.refreshtokenservice(refreshtoken);
  const cookieoption = {
    secure: config.env === "production",
    httponly: true,
  };
  res.cookie("refreshtoken", refreshtoken, cookieoption);
  Sendresponse<Iaccesstoken>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfully",
    data: result,
  });
});

const changepassword = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  console.log(user);
  const { ...passworddata } = req.body;
  await authservice.changepassword(user, passworddata);

  Sendresponse<Iloginresponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "password change successfully",
  });
});

export const authcontroller = {
  login,
  refreshtoken,
  changepassword,
};
