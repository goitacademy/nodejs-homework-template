const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const  User = require('../models/users');
const { JWT_SECRET } = process.env;


const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");


    try {
        if (bearer !== "Bearer") {
            throw new Unauthorized("Not authorized");
        }

const { userId } = jwt.verify(token, JWT_SECRET);
const user = await User.findById(userId);
        
        if (!user || !user.token) {
            throw new Unauthorized("Not authorized");
        }
        req.user = user
        console.log({user})
        next()
    } catch (error) {
        console.log({error})
        if (error.message === "invalid signature") {
            error.status = 401;
        }
        next(error);
    }
};

module.exports = auth;
