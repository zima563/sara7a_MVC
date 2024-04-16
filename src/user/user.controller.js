import Crypto from "crypto-js"
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
        // Key for encryption (must be 24 bytes)
        const key = Crypto.enc.Hex.parse("0123456789abcdef0123456789abcdef0123456789abcdef");
        const messageCrypt = Crypto.TripleDES.encrypt(req.body.message, key, {
            mode: Crypto.mode.ECB, // Electronic Codebook mode
            padding: Crypto.pad.Pkcs7 // Padding scheme
        })

        await messageModel.insertMany({ receiveId: req.params.id, message: messageCrypt })

       return res.redirect(`/user/${req.params.id}`)
    }
    req.flash("info",error.details)
    res.redirect(`/user/${req.params.id}`)
}

export {
    userControlller,
    handleUser
}