
import express from "express"
import { messageControlller } from "./message.controller.js";
import { protectRoutes } from "../middlewares/authentication.js";
import { allowedTo } from "../middlewares/authorization.js";



const messageRouter = express.Router();


messageRouter.route("/message").get(protectRoutes, allowedTo("user"), messageControlller)

export default messageRouter