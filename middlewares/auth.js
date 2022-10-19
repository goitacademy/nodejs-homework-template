const { Unauthorized } = require("http-errors");
const jwt = require('jsonwebtoken')
require("dotenv").config()
const { SECRET_KEY } = process.env;
const { User } = require('../models/user')



const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(' ');
  
    try {
          if (bearer !== "Bearer") {
        throw new Unauthorized("Not authorized")
    }
        const { id } = jwt.verify(token, SECRET_KEY);
       
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw new Unauthorized("Not authorized")
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.message === "Invalid signature"){
            error.status = 401;
        }
        next(error);
    }
   
}

module.exports = auth;