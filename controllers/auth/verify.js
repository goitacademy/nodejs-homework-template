const createError = require("http-errors")
const sendMail = require("../../helpers")
const { User, schemas } = require("../../models/user")


const verify = async(req, res, next) => {
    try {
        const { error } = schemas.verify.validate(req.body)
        if (error) {
            throw new createError(400, "missing required field email")
        }
        const { email } = req.body
        const user = User.findOne({ email })
        if (user.verify) {
            throw new createError(400, "Verification has already been passed")
        }
        const mail = {
            to: email,
            subject: "Подтверждение",
            html: `<a target="_blank" href='http://localhost:3000/api/users/${user.verificationToken}'>Click here</a>`
        }
        await sendMail(mail);
        res.json({
            "message": "Verification email sent"
        })
    } catch (error) {
        next(error)
    }
};

module.exports = verify;