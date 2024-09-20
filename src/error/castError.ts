import mongoose from "mongoose";
import { IGenericerrormessage } from "../interface/error";

const Casterror = (err: mongoose.CastError) => {
  const errormessage: IGenericerrormessage[] = [
    {
      path: err.path,
      message: "Invalid Id",
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "cast error",
    errorMessage: errormessage,
  };
};

export default Casterror;
