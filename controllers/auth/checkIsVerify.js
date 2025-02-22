const Joi = require('joi');
const User = require('../../models/user');
const sendEmail = require('../../controllers/email/sendEmail');

const emailSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
});

const checkIsVerify = async (req, res, next) => {
    try {
        const { email } = req.body;
        const verificationToken = Math.floor(Math.random(10) * 1000000);
        const validate = emailSchema.validate({
            email
        })
        if (validate.error) { return res.status(400).json(validate.error) }
        if (!email) { return res.status(400).json({ message: "Missing required field email" }) };
        const contact = await User.findOneAndUpdate({ email }, { verificationToken });
        const { verify } = contact;
        if (verify === true) { return res.status(400).json({ message: "Verification has already been passed" }) }
        else {
            sendEmail(email, verificationToken);
            return res.status(200).json({ message: "Verification email sent" })
        };
    } catch (error) {
        next(error)
    }
};



module.exports = checkIsVerify;