import { IGenericerrormessage } from "./error";

export type IGenericResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericerrormessage[];
};

export type IgenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
