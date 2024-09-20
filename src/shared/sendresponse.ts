import { Response } from "express";

type Iapiresponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  } | null;
  data?: T | null;
};

const Sendresponse = <T>(res: Response, data: Iapiresponse<T>): void => {
  const responsedata: Iapiresponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message || null,
    meta: data?.meta || null || undefined,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responsedata);
};

export default Sendresponse;
