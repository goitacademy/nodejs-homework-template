const { User } = require("../../model/user");
const { HttpError} = require('../../helpers');
const bcrypt = require("bcrypt");
const gravatar = require("gravatar")

const register = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email already is use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email)

    const newUser = await User.create({...req.body, password: hashPassword, avatarUrl});
  
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        subscription: newUser.subscription,
        avatarUrl: newUser.avatarUrl
    })
}

module.exports = register;