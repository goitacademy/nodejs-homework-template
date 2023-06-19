const jwt = require('jsonwebtoken')

const User = require('../models/userModel');

const {HttpError} = require('../onError')
require('dotenv').config();
const {SECRET_KEY} = process.env;


const authCheck = async (req, res, next) => {
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        next(HttpError(401))
        // next(errorHandler(401))
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if(!user || !user.token) {
            next(HttpError(401))
        }
        req.user = user;
        next();
    }
    catch {
        next(HttpError(401));
    }
}

module.exports = {authCheck}