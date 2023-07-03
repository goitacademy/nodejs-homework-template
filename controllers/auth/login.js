const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = process.env;


const login = async (req,res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) {
         throw HttpError(401, "Email or password is wrong")
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare){
        throw HttpError(401, "Email or password is wrong")
    }

    const payload = {
        id: user.id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "4h"});
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
    })

}

module.exports = login;