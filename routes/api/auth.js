const express = require("express");
const { BadRequest, Conflict, Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const { User } = require("../../models");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const router = express.Router();
const { SECRET_KEY } = process.env;

router.post("/signup", async (req, res, next) => {
    try {
        const { error } = joiRegisterSchema.validate(req.body)
        if (error) {
            throw new BadRequest(error.message);
        }
        const { name, email, password, subscription } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Conflict("Email in use");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const avatarURL = gravatar.url(email);
        const newUser = await User.create({ name, email, password: hashPassword, subscription, avatarURL });
        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            }
        })

    } catch (error) {
        next(error);
    }

})

router.post("/login", async (req, res, next) => {
    try {
        const { error } = joiLoginSchema.validate(req.body)
        if (error) {
            throw new BadRequest(error.message);
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Unauthorized("Email or password is wrong");
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw new Unauthorized("Email or password is wrong");
        }
        const { _id, subscription } = user;
        const payload = {
            id: _id
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
        await User.findByIdAndUpdate(_id, { token });
        res.json({
            token,
            user: {
                email,
                subscription
            }
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;