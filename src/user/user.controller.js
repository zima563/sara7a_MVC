import { messageModel } from "../../databases/models/messageModel.js"
import { userModel } from "../../databases/models/userModel.js"

import joi from "joi";

const schema= joi.object({
    message: joi.string().min(1).max(150).trim().required()
})

const userControlller = async(req,res)=>{

    let user = await userModel.findById(req.params.id);
    res.render("user.ejs",{session:undefined,userId:req.params.id, user , error: req.flash("info")})
}


const handleUser = async(req,res)=>{
    let { error } = schema.validate(req.body , {abortEarly: false})
    if(!error?.details){
        await messageModel.insertMany({receiveId:req.params.id,message:req.body.message})

       return res.redirect(`/user/${req.params.id}`)
    }
    req.flash("info",error.details)
    res.redirect(`/user/${req.params.id}`)
}

export {
    userControlller,
    handleUser
}