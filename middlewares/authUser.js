const jwt=require('jsonwebtoken');
require('dotenv').config();

const {SECRET_KEY}=process.env;

const User=require('../models/users')

const authUser = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [, token] = authorization.split(" ");

    try {
        jwt.verify(token, SECRET_KEY);
    } catch (error) {
        error.status = 401;
        error.message = "Not authorized";
        next(error);
    }

    const { id } = jwt.decode(token);
    const user = await User.findById(id);
    if (!user) {
        res.status(401).json({
            message: "Not authorized",
        });
    }
    req.user = user;

    next();
};

module.exports = authUser;
