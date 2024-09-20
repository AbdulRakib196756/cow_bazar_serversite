import httpStatus from "http-status";
import ApiError from "../../error/apiError";
import { jwthelpers } from "../../helpers/jwttokenhelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const auth =
  (...requiredrole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.NOT_FOUND, "ÿou are not authorized");
      }

      let varifieduser = null;

      varifieduser = jwthelpers.verifeidtoken(token, config.token as Secret);

      req.user = varifieduser;
      if (requiredrole.length && !requiredrole.includes(varifieduser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
