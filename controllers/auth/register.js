const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user")

const register = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;        
        const user = await User.findOne({ email })
        if (user) {
            throw new Conflict("Email in use");
        }
        const avatarURL = gravatar.url(email);
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = await User.create({ email, subscription, password: hashPassword, avatarURL });
        res.status(201).json({
            status: "success",
            code: 201,
            ResponseBody: {
                user: newUser
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = register;