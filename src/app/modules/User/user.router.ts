import express from "express";
import { Usercontroller } from "./user.controller";
import validationrequest from "../../middleware/validationrequest";
import Uservalidation from "./user.validation";

const router = express.Router();

router.post(
  "/createuser",
  validationrequest(Uservalidation),
  Usercontroller.createUser
);
router.get("/getalluser", Usercontroller.getalluser);
router.get("/:id", Usercontroller.getsingleUser);

export const userroutes = router;
