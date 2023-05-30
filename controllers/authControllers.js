const bcrypt = require("bcrypt");

const { HttpError } = require("../helpers");
const ctrlWrapper = require("../decorators/ctrlWrapper");
const { User }= require("../models/users");

const register = ctrlWrapper(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw new HttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({...req.body, password: hashPassword});

    res.status(201).json({
        email: result.email,
    })
})

module.exports = {
    register,
}