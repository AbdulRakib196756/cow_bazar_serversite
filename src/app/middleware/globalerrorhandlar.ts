import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { IGenericerrormessage } from "../../interface/error";
import { errorLogger } from "../../shared/logger";
import ValidationError from "../../error/ValidationError";

import Casterror from "../../error/castError";
import ApiError from "../../error/apiError";
import handlezodEror from "../../error/zodError";
import { ZodError } from "zod";

const golbalerrorhandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
  config.env === "development"
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = "something went wrong";
  let errorMessages: IGenericerrormessage[] = [];

  if (error?.name === "ValidationError") {
    const simplifiedError = ValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handlezodEror(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (error?.name === "CastError") {
    const simplifiedError = Casterror(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};

export default golbalerrorhandler;
