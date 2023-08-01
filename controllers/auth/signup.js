const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../../models/user");
const HttpError = require("../../helpers/index");
const { ctrlWrapper } = require("../../decorators/index");

dotenv.config();
// const {JWT_SECRET} = process.env;

const signup = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
     

    if(user) {
        throw HttpError(409, `Email ${email} in use`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});
 
    res.status(201).json({        
        email: newUser.email,
        subscription: newUser.subscription,
    })
};

module.exports = { signup: ctrlWrapper(signup) };