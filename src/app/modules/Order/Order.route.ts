import express from "express";

import { Orderconstroller } from "./Order.controller";

const router = express.Router();

router.post("/create-order", Orderconstroller.createOrder);

export const OrderRoutes = router;
