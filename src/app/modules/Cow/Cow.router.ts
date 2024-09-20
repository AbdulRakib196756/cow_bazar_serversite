import express from "express";
import { cowcontroller } from "./Cow.controller";
import validationrequest from "../../middleware/validationrequest";
import { cowvalidation } from "./cow.validation";

const router = express.Router();

router.post(
  "/create-cow",
  validationrequest(cowvalidation),
  cowcontroller.createcow
);
router.get(
  "/",

  cowcontroller.getallcow
);
router.get(
  "/:id",

  cowcontroller.getsinglecow
);

export const cowroutes = router;
