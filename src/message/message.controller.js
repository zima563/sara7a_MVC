import Jwt from "jsonwebtoken";
import Crypto from "crypto-js"

import { messageModel } from "../../databases/models/messageModel.js";
import { userModel } from "../../databases/models/userModel.js";


const messageControlller = async(req,res)=>{
    let decoded = Jwt.verify(req.session.token, process.env.JWT_KEY);
    let fullurl = req.protocol + "://" + req.get("host") + "/user/" + decoded.userId;
    if (!decoded.isLoggedIn) return res.redirect("/login")

    let messages = await messageModel.find({ receiveId: decoded.userId })
    let messagesDecryprt = [];
    for (let i = 0; i < messages.length; i++) {
        const key = Crypto.enc.Hex.parse("0123456789abcdef0123456789abcdef0123456789abcdef");
        const decrypted1 = Crypto.TripleDES.decrypt(messages[i].message, key, {
            mode: Crypto.mode.ECB, // Electronic Codebook mode
            padding: Crypto.pad.Pkcs7 // Padding scheme
        }).toString(Crypto.enc.Utf8);
        messagesDecryprt.push(decrypted1);
    }

    let user = await userModel.findById(decoded.userId)
    res.render("message.ejs", { session: req.session, fullurl, messagesDecryprt, user })
}


export {
    messageControlller
}