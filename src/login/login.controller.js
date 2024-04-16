import Jwt from "jsonwebtoken"
import { userModel } from "../../databases/models/userModel.js"

const loginControlller = (req,res)=>{
    res.render("login.ejs",{error:req.query?.error,session: undefined})
}

const handleLogin =async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email});
    if(!user) return res.redirect("/login?error=invalid eamil or password");
    if(user.password!==req.body.password) return res.redirect("/login?error=invalid eamil or password"); 


    let token = Jwt.sign({ userId: user._id, isLoggedIn: true, userName: user.name }, process.env.JWT_KEY);
    req.session.token = token;

    res.redirect("/message")
}


export {
    loginControlller,
    handleLogin
}