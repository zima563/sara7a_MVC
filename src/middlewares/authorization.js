const allowedTo = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return res.redirect("/login")

        next();
    };
};


export {
    allowedTo
}