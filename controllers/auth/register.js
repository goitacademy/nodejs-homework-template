const { User, schemas } = require('../../models/user');
const createError = require('http-errors');
const bcrypt = require("bcryptjs");
const gravatat = require('gravatar');
const { v4 } = require("uuid");
const { sendMail } = require('../../helpers');



const register = async (req, res, next) => {
    try {
        const { error } = schemas.register.validate(req.body);
        if (error) {
            throw new createError(400, error.message)
        }
        const { email, password } = req.body;
        const userCheck = await User.findOne({ email });
        if (userCheck) {
            throw new createError(409, "Email in use");
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const avatarURL = gravatat.url(email);
        const verificationToken = v4();
        const user = User.create({ email, avatarURL, password: hashPassword, verificationToken });
        const mail = {
            to: email,
            subject: "Подтвеждение email",
            html: `<a target="_blank" href='http://localhost:3000/api/users/${verificationToken}'>Нажмите чтобы подтвердить свой email</a>`
        }
        sendMail(mail)

        res.status(201).json({
            user: {
                email,
                "subscription": user.subscription
            }
        })
    } catch (error) {
        next(error)
    }
};

module.exports = register;