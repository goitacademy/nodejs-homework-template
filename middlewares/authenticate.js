const jwt = require("jsonwebtoken");

const { User } = require("../models/user")

require("dotenv").config();

const { SECRET_KEY } = process.env;

const { ResponseError } = require("../helpers/");

const authenticate = async (req, res, next) => {
    const { authorization = " "} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(ResponseError(401, 'Not authorized' ))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token ) {
            next(ResponseError(401, 'Not authorized'));
        }
        req.user = user;
        next();
       
        
    } catch  {
        next(ResponseError(401, 'Not authorized'))
    }

}



module.exports = authenticate;