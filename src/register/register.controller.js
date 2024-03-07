import { userModel } from "../../databases/models/userModel.js"
import joi from "joi"
const schema = joi.object({
    name: joi.string().min(2).max(30).required().trim(),
    email: joi.string().email().required().trim(),
    password: joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
    PasswordConfirmation: joi.valid(joi.ref("password")).required(),
})

const registerControlller = (req,res)=>{
    res.render("register.ejs",{error: req.query?.error,session: undefined ,err: req.flash("info")})
}

const handleRegister = async(req,res)=>{
    let user = await userModel.findOne({email: req.body.email});
    if(user) return res.redirect("/register?error=user already exist")
    let { error } = schema.validate(req.body , {abortEarly: false})

    if(!error?.details) {
        await userModel.insertMany(req.body);
        return res.redirect("/login")
    }
    req.flash("info",error?.details)
    res.redirect("/register")


 
}
export {
    registerControlller,
    handleRegister
}