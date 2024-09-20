import { Request, RequestHandler, Response } from "express";

import catchAsync from "../../../shared/catchasych";
import { userservice } from "./user.service";
import Sendresponse from "../../../shared/sendresponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;

    const result = await userservice.createUser(userData);

    Sendresponse<IUser>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "user create successfully",
      data: result,
    });
  }
);
const getalluser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userservice.getalluser();

    Sendresponse<IUser[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "retrived alluserdata successfully",
      data: result,
    });
  }
);

const getsingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const singleuser = await userservice.getsingleUser(id);

  Sendresponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "single user retrived successfully",
    data: singleuser,
  });
});
export const Usercontroller = {
  createUser,
  getalluser,
  getsingleUser,
};
