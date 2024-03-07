
import express from "express"
import { homeControlller } from "./home.controller.js";


const homeRouter = express.Router();


homeRouter.route("/").get(homeControlller)

export default homeRouter