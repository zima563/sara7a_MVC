import { userModel } from "../../databases/models/userModel.js"

const loginControlller = (req,res)=>{
    res.render("login.ejs",{error:req.query?.error,session: undefined})
}

const handleLogin =async (req,res)=>{
    let user = await userModel.findOne({email:req.body.email});
    if(!user) return res.redirect("/login?error=invalid eamil or password");
    if(user.password!==req.body.password) return res.redirect("/login?error=invalid eamil or password"); 

    req.session.isLoggedIn = true;
    req.session.user_id = user._id
    req.session.name = user.name

    res.redirect("/message")
}


export {
    loginControlller,
    handleLogin
}