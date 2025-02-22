const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { SECRET } = process.env;

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
});

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validate = loginSchema.validate({ email, password });
        if (validate.error) { return res.status(400).json(validate.error) };
        const isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }
        const validPassword = await bcrypt.compare(password, isUser.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Email or password is wrong" });
        }
        const payload = { id: isUser._id, email };
        const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
        await User.findByIdAndUpdate(payload.id, { token });
        return res.status(200).json(token);
    } catch (error) {
        next(error);
    }
}

module.exports = login;