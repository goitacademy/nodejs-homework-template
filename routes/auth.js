const express = require('express')
const router = express.Router()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport');
const User = require('../models/user.js')
const { validate } = require('uuid')
const auth = require('../middleware/authorization.js')

const { SECRET } = process.env;

const registerSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required(),
    subscription: Joi.string()
        .default("starter")
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
});

router.post("/signup", async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;
        const validate = registerSchema.validate({
            email, password, subscription
        });
        validate.error && res.status(400).json({
            error: validate.error.message
        })
        const usedUser = await User.findOne({ email });
        usedUser && res.status(409).json({
            message: "Email in use"
        });
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            email,
            password: hashedPassword,
            subscription
        });
        res.status(201).json({
            status: "success",
            message: {
                user: {
                    email,
                    subscription
                }
            },
        })
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validateLogin = loginSchema.validate({ email, password });
        !validateLogin && res.status(400).json({ error: validate.error.message });
        const isUser = await User.findOne({ email });
        if (!isUser) {
            res.status(401).json({ message: "Email or password is wrong" })
        }
        const validPassword = await bcrypt.compare(password, isUser.password);
        if (!validPassword) {
            res.status(401).json({ message: "Email or password is wrong" })
        }
        const payload = { id: isUser._id, email };
        const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
        const response = await User.findByIdAndUpdate(payload.id, { token });
        res.status(200).json(token);

    } catch (error) {
        next(error);
    }
});

router.get('/logout', auth, async (req, res, next) => {
    try {
        let { _id } = req.user;
        console.log(_id);
        await User.findByIdAndUpdate(_id, { token: null });
       _id = null;
        res.json({ message: "logged out" });
    } catch (error) {
        next(error);
    }

})

module.exports = router; 