import { messageModel } from "../../databases/models/messageModel.js";
import { userModel } from "../../databases/models/userModel.js";


const messageControlller = async(req,res)=>{

    let fullurl = req.protocol + "://" + req.get("host") + "/user/" + req.session.user_id;
    if(!req.session.isLoggedIn) return res.redirect("/login")

    let messages = await messageModel.find({receiveId:req.session.user_id})
    let user = await userModel.findById(req.session.user_id)
    res.render("message.ejs", {session: req.session , fullurl, messages, user})
}


export {
    messageControlller
}