const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user")
// const nanoid = require("nanoid");
const uuid = require("uuid")
const sendEmail = require("../../helpers/sendEmail")

const register = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;        
        const user = await User.findOne({ email })
        if (user) {
            throw new Conflict("Email in use");
        }
        const avatarURL = gravatar.url(email);
        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const verificationToken = uuid.v4();
        const newUser = await User.create({ email, subscription, password: hashPassword, avatarURL, verificationToken });
        const mail = {
            to: email,
            subject: "Підтвердження email",
            html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердити email</a>`
        }

        await sendEmail(mail);
        
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