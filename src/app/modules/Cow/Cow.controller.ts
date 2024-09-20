import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchasych";
import Sendresponse from "../../../shared/sendresponse";
import httpStatus from "http-status";
import { Icow } from "./Cow.interface";
import { cowservice } from "./Cow.service";
import pick from "../../../shared/pick";
import { pagination } from "../../../constant/pagination";
import { cowfilterablefeild } from "./cow.constant";

const createcow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cowdata = req.body;
    const result = await cowservice.createCow(cowdata);

    Sendresponse<Icow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "cow data created successfully",
      data: result,
    });
  }
);

const getsinglecow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await cowservice.getsinglecow(id);

    Sendresponse<Icow>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "single cow data retrived successfully",
      data: result,
    });
  }
);
const getallcow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationoption = pick(req.query, pagination);
    const filters = pick(req.query, cowfilterablefeild);

    const result = await cowservice.getallcow(paginationoption, filters);

    Sendresponse<Icow[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "all  cow data retrived successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const cowcontroller = {
  createcow,
  getsinglecow,
  getallcow,
};
