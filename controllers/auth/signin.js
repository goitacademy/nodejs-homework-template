const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../../models/user");
const HttpError = require("../../helpers/index");
const { ctrlWrapper } = require("../../decorators/index");

dotenv.config();
const {JWT_SECRET} = process.env;

const signin = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "email invalid");
    };  

    const passwordCompare = await bcrypt.compare(password, user.password); 
     
    if(!passwordCompare) {
        throw HttpError(401, "password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "72h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
    })
};

module.exports = { signin: ctrlWrapper(signin) };