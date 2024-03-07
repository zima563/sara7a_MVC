
import express from "express"
import { handleUser, userControlller } from "./user.controller.js";



const userRouter = express.Router();


userRouter.route("/user/:id").get(userControlller)
userRouter.route("/handleUser/:id").post(handleUser)


export default userRouter