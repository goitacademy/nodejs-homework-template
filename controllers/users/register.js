const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
    const hachPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    if (user) {
        throw RequestError(409, `User with ${email} alredy exist!`);
    }
    const result = await User.create({ password: hachPassword, email, subscription });
    res.status(201).json({
        status: "success",
        code: 201,
        user: {
            email,
            subscription
        }
    })
};

module.exports = register;