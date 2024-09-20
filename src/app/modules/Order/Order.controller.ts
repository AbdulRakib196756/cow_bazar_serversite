import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchasych";
import { orderservice } from "./Order.service";
import Sendresponse from "../../../shared/sendresponse";
import { Iorder } from "./Order.interface";
import httpStatus from "http-status";

const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...orderdata } = req.body;

    const result = await orderservice.createOrder(orderdata);

    Sendresponse<Iorder>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Order created successfully",
      data: result,
    });
  }
);

export const Orderconstroller = {
  createOrder,
};
