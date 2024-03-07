
import express from "express"
import { handleLogin, loginControlller } from "./login.controller.js";


const loginRouter = express.Router();


loginRouter.route("/login").get(loginControlller)
loginRouter.route("/handleLogin").post(handleLogin)


export default loginRouter