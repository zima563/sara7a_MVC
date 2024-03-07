
import express from "express"
import { handleRegister, registerControlller  } from "./register.controller.js";



const registerRouter = express.Router();


registerRouter.route("/register").get(registerControlller)
registerRouter.route("/handleRegister").post(handleRegister)

export default registerRouter