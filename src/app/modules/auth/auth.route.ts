import express from "express";
import { authcontroller } from "./auth.controller";
import auth from "../../middleware/auth";
import { ENUMS_USER_ROLE } from "../../../Enums/enums";

const route = express.Router();

route.post("/login", authcontroller.login);
route.post("/refresh-token", authcontroller.refreshtoken);
route.post(
  "/change-password",
  auth(ENUMS_USER_ROLE.BUYER, ENUMS_USER_ROLE.SELLER),
  authcontroller.changepassword
);

export const authroutes = route;
