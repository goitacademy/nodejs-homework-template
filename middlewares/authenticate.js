const jwt = require("jsonwebtoken");

const User = require("../models/user");
const HttpError = require("../helpers/index");
const { ctrlWrapper } = require("../decorators/index");

const dotenv = require("dotenv");
dotenv.config();

const {JWT_SECRET} = process.env;

const authenticate = async(req, res, next)=> {
    
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer") {        
        throw HttpError(401);
    }

    try {        
        const {id} = jwt.verify(token, JWT_SECRET);       
        const user = await User.findById(id);        
        if(!user || !user.token) {            
            throw HttpError(401);
        }
        req.user = user;
        next();
    }
    catch {
        throw HttpError(401);
    }
};

module.exports = ctrlWrapper(authenticate);