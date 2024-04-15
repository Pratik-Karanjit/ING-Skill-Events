import { Router } from "express";
import { createUser } from "../controller/userController.js";
import isAuthenticatedForEmail from "../middleware/isAuthenticatedForEmail.js";

let userRouter = Router();

userRouter.route("/").post(createUser);

export default userRouter;
