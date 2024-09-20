import express from "express";
import { userroutes } from "../modules/User/user.router";
import { cowroutes } from "../modules/Cow/Cow.router";
import { OrderRoutes } from "../modules/Order/Order.route";

import { authroutes } from "../modules/auth/auth.route";

const routes = express.Router();

const Routermodule = [
  {
    path: "/users",
    route: userroutes,
  },
  {
    path: "/cows",
    route: cowroutes,
  },
  {
    path: "/Order",
    route: OrderRoutes,
  },
  {
    path: "/auth",
    route: authroutes,
  },
];

Routermodule.forEach((router) => routes.use(router.path, router.route));

export default routes;
