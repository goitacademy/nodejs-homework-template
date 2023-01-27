const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");

const {User} = require('../models');

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    // console.log(req.headers);
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(' ');
    try {
        if(bearer !== "Bearer"){
            // console.log(`bearer !== "Bearer"`);
            throw new Unauthorized("Not authorized");
        }
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        // console.log(user);
        if(!user || !user.token){
            console.log(user);
            console.log(user.token);
            console.log(`!user || !user.token`);
            throw new Unauthorized("Not authorized");
        };
        req.user = user;
        next();
    } catch (error) {
        if(error.message === "Invalid sugnature"){
            error.status = 401;
        }
        next(error);
    }
    
}

module.exports = authenticate;