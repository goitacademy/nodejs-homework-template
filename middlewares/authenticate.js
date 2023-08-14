const jwt = require("jsonwebtoken");

const{User} = require("../models/user")

const { SECRET_KEY } = process.env;

const { ResponseError } = require("../helpers");

const authenticate = async (req, res, next) => {
    const { authorization = " "} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(ResponseError(401))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
            next(ResponseError(401));
        }
        next();
       
        
    } catch (error) {
        next(ResponseError(401))
    }

}



module.exports = authenticate;