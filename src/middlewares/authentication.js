import Jwt from "jsonwebtoken"
import { userModel } from "../../databases/models/userModel.js";
const protectRoutes = async (req, res, next) => {
    let token = req.session.token

    if (!token) return next(new apiError("not token provide", 401));

    let decoded = Jwt.verify(token, process.env.JWT_KEY);
    let user = await userModel.findById(decoded.userId);
    if (!user) return res.redirect("/login")
    if (!decoded.isLoggedIn) return res.redirect("/login")
    // if (user.passwordChangedAt) {
    //     let timeOfChangePassword = parseInt(user?.passwordChangedAt / 1000);
    //     if (timeOfChangePassword > decoded.iat)
    //         return next(new apiError("invalid token..please login", 401));
    // }

    // // console.log(decoded.iat + "|" + parseInt(user?.logoutAt / 1000));
    // if (user.logoutAt) {
    //     let timeOflogout = parseInt(user?.logoutAt / 1000);
    //     if (timeOflogout > decoded.iat)
    //         return next(new apiError("invalid token..please login", 401));
    // }
    req.user = user;
    next();
};

export {
    protectRoutes
}