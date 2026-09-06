const {getUser , setUser } = require("../service/auth")

 function checkForAuthentication(req, res, next) {
     const tokenCookie = req.cookies?.token;
     
     req.user = null;

     if(! tokenCookie) return next();
     
     
     const token = tokenCookie;
     const user = getUser(token);
     
     req.user = user ;
     return next();
    }
    
    function restrictTo(roles = []) {
        return function(req, res, next) {
        console.log("USER:", req.user);

        if (!req.user) {
            return res.redirect("/login");
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        next();
    };
}

module.exports={
    checkForAuthentication,
    restrictTo
}