
import express from "express"
import { messageControlller } from "./message.controller.js";



const messageRouter = express.Router();


messageRouter.route("/message").get(messageControlller)

export default messageRouter