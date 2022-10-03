const express = require('express');
const Joi = require("joi");
const router = express.Router();

module.exports = router;

const User = require('../../models/users')

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authUser = require('../../middlewares/authUser')

require("dotenv").config();
const {SECRET_KEY} = process.env;

const Schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

const LoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

router.post("/users/signup", async (req, res) => {
    try {
        const {error} = Schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Missing required field",
            });
        }

        const {password, email, subscription} = req.body;

        const userEmail = await User.findOne({email});
        if (userEmail) {
            return res.status(409).json({
                message: "Email in use",
            });
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await User.create({password: hashedPassword, email, subscription});
        res.status(201).json({subscription: result.subscription, email: result.email});
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
});


router.post("/users/login", async (req, res) => {
    try {
        const {error} = LoginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.message,
            });
        }

        const {password, email} = req.body;

        const user = await User.findOne({email});
        const userPassword = await bcrypt.compare(password, user.password);

        if (!user || !userPassword) {
            return res.status(401).json({
                message: "Email or password is wrong",
            });
        }

        const token = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: "1h"});

        const setTokenToUser = await User.findByIdAndUpdate(user._id, {token}, {new: true});

        res.json({
            token: setTokenToUser.token,
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
});


router.get("/users/logout", authUser, async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findOneAndUpdate({id: _id}, {token: ""}, {new: true});
        res.status(204).json({
            message: "No Content",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
});


router.get("/users/current", authUser, async (req, res) => {
    try {
        const {_id} = req.user;
        const currentUser = await User.findById(_id);
        if (!currentUser) {
            res.status(404);
        }
        res.json({
            email: currentUser.email,
            subscription: currentUser.subscription,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
});
