import mongoose from "mongoose";
import { IGenericResponse } from "../interface/common";
import { IGenericerrormessage } from "../interface/error";

const ValidationError = (
  err: mongoose.Error.ValidationError
): IGenericResponse => {
  const errormessage: IGenericerrormessage[] = Object.values(err.errors).map(
    (el) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: "validation Error",
    errorMessage: errormessage,
  };
};

export default ValidationError;
