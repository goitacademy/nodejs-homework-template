const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models/user');

const {SECRET_KEY} = process.env;

const auth = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(" ");
    console.log(bearer, token);
    if (bearer !== "Bearer") {
        console.log("No Bearer");
        next(HttpError(401))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        console.log(user);
        if (!user) {
        console.log("No User");
           next(HttpError(401)) 
        }
        next();
    } catch {
        console.log("token is invalid");
        next(HttpError(401))
    }

};



module.exports = auth;
