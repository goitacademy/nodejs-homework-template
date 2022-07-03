const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models");


const checkAuth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
   

    try {
        if (bearer !== "Bearer") {
            throw new Unauthorized("Not authorized");
        }
       
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(id);
        
        if (user?.token !== token) {
            throw new Unauthorized("Not authorized");
        }
        req.user = user;
   
        next();
    } catch (error) {
        if (error.message === "invalid signature") {
            error.status = 401;
        }
        next(error);
    }
};

module.exports = { checkAuth };