const { User } = require("../../model/user");
const { HttpError} = require('../../helpers');
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email already is use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword});
  
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
    })
}

module.exports = register;