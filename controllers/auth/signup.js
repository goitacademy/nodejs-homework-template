const User = require('../../models/user');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const Joi = require('joi');

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

const signup = async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;
        const avatarURL = gravatar.url(email);
        const validate = registerSchema.validate({
            email, password, subscription, avatarURL
        });

        if (validate.error) { return res.status(400).json(validate.error) };
        const isUser = await User.findOne({ email });
        isUser && res.status(409).json({
            message: "Email in use"
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            email,
            password: hashedPassword,
            subscription,
            avatarURL
        });

        return res.status(201).json({
            status: "success",
            message: {
                user: {
                    email,
                    subscription,
                    avatarURL
                }
            },
        })
    } catch (error) {
        next(error);
    }
};

module.exports = signup;