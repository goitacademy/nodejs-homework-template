const User = require('../../models/user');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const Joi = require('joi');
const sendEmail = require('../../controllers/email/sendEmail');

const registerSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required(),
    subscription: Joi.string()
        .default("starter"),
    avatarURL: Joi.string()
});

const verificationSchema = Joi.object({
    verify: Joi.boolean()
        .required(),
    verificationToken: Joi.number()
        .required()
})

const signup = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;
        const avatarURL = gravatar.url(email);
        const verificationToken = Math.floor(Math.random(10) * 1000000);
        const verify = false;
        const validateRegister = registerSchema.validate({
            email, password, subscription, avatarURL
        });

        const validateVerification = verificationSchema.validate({
            verify, verificationToken
        });

        if (validateRegister.error) { return res.status(400).json(validateRegister.error) };
        if (validateVerification.error) { return res.status(400).json(validateVerification.error) };
        const isUser = await User.findOne({ email });
        isUser && res.status(409).json({
            message: "Email in use"
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashedPassword,
            subscription,
            avatarURL,
            verify,
            verificationToken,
        });

        sendEmail(email, verificationToken);

        return res.status(201).json({
            status: "success",
            message: {
                user: {
                    email,
                    subscription,
                    avatarURL,
                    verify,
                    verificationToken
                }
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = signup;