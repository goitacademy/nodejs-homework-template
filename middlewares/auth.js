const {Unauthorized} = require("http-errors");
const jwt = require("jsonwebtoken");

const {User} = require("../models");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    console.log(authorization)
    const [bearer, token] = authorization.split(" ");
    console.log(token)
    try {
        if (bearer !== 'Bearer') {
        throw new Unauthorized("Not authorized");
    };
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
        throw new Unauthorized("Not authorized");
    }
        req.user = user;
        next();
    } catch (error) {
        if (error.message === "Invalid signature") {
            error.satus = 401;
        }
        next(error);
    }
    
}

module.exports = auth