import { ZodError } from "zod";
import { IGenericResponse } from "../interface/common";

import { IGenericerrormessage } from "../interface/error";

const handlezodEror = (error: ZodError): IGenericResponse => {
  const statusCode = 400;

  const errormessage: IGenericerrormessage[] = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode: statusCode,
    message: "validation Error",
    errorMessage: errormessage,
  };
};

export default handlezodEror;
