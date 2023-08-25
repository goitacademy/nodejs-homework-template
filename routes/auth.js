const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const path = require('path');
const Jimp = require('jimp');
const fs = require('fs').promises;
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const auth = require('../middleware/auth.js');
const upload = require('../middleware/multer.js');
const storeImage = path.join(process.cwd(), 'public/avatars');
const { SECRET } = process.env;

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

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string()
        .required()
        .valid("pro", "starter", "business")
});

router.post("/signup", async (req, res, next) => {
    try {
        const { email, password, subscription } = req.body;
        const avatarURL = gravatar.url(email);
        const validate = registerSchema.validate({
            email, password, subscription, avatarURL
        });

        validate.error && res.status(400).json(validate.error);

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
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const validate = loginSchema.validate({ email, password });
        validate.error && res.status(400).json({ error: validate.error });
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
);

router.get('/logout', auth, async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: null }, { new: true });
        return res.json({ message: "logged out" });
    } catch (error) {
        next(error);
    }

});

router.get('/current', auth, async (req, res, next) => {
    try {
        const { email, subscription } = req.user;
        return res.json({ email, subscription });
    } catch (error) {
        next(error);
    }
});

router.patch("/", auth, async (req, res, next) => {
    try {
        const { _id, email } = req.user;
        const { subscription } = req.body;
        const validate = subscriptionSchema.validate({ subscription });
        if (validate.error) {
            return res.status(400).json(validate.error);
        }
        await User.findByIdAndUpdate(_id, { subscription }, { new: true });
        return res.json({ email, subscription });
    } catch (error) {
        next(error);
    }
});

router.patch('/avatars', auth, upload.single('avatar'), async (req, res, next) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    const avatarURL = path.join(storeImage, imageName);
    try {
        const image = await Jimp.read(tempUpload);
        image.resize(150, 150);
        await image.writeAsync(avatarURL);
        await fs.unlink(tempUpload);
        await User.findByIdAndUpdate(id, { avatarURL });
        return res.status(200).json({ message: "succes", avatarURL });
    } catch (err) {
        await fs.unlink(tempUpload);
        return next(err);
    }
});



module.exports = router; 