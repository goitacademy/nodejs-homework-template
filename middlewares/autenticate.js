const jwt = require("jsonwebtoken")
const User = require('../model/user')
const Users = require('../repository/usersDB')

// require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const authenticate = async(req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({
            status: "error",
            code: 401,
            message: "Not authorized"
        });
        return;
    }

    const [bearer, token] = authorization.split(" ");
    if(bearer !== "Bearer"){
        res.status(401).json({
            status: "error",
            code: 401,
            message: "Not authorized"
        });
        return;
    }

    try {
        const { _id } = jwt.verify(token, SECRET_KEY);
        // console.log(jwt.verify(token, SECRET_KEY))
        const user = await Users.findById(_id);
        // console.log(user)
        if(!user.token){
            res.status(401).json({
                status: "error",
                code: 401,
                message: "Not authorized"
            });
            return;
        }
        req.user = user;
        next();
    } 
    catch (error) {
        res.status(401).json({
            status: "error",
            code: 401,
            message: "Not authorized"
        });
        return;
    }
};

module.exports = authenticate;