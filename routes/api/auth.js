const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const Jimp = require('jimp');
const path = require("path");
const fs = require("fs/promises");

const { createError, createHashPass } = require('../../helpers')

const User = require('../../models/user');
const { authorize, upload } = require('../../middlewares')

const registerUserSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
})

const loginUserSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
})

const { SECRET_KEY } = process.env
const router = express.Router()

router.post('/register', async (req, res, next) => {
    try {
        const { error } = registerUserSchema.validate(req.body)
        if (error) {
            throw createError(400, error.message)
        }

        const { email, password, name } = req.body
        const user = await User.findOne({ email })
        if (user) {
            throw createError(409, 'Email in use')
        }
        
        const hashPassword = await createHashPass(password);
        const avatarURL = await gravatar.url(email);
        const newUser = await User.create({ email, name, password: hashPassword })
        res.status(201).json({
            email: newUser.email,
            name: newUser.name,
            avatarURL,
        })
    } catch (e) {
        next(e)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { error } = loginUserSchema.validate(req.body)
        if (error) {
            throw createError(400, error.message)
        }

        const { email, password } = req.body
        
        const user = await User.findOne({ email })
        if (!user) {
            throw createError(401, 'Credentials not found')
        }

        const isValidPass = await bcrypt.compare(password, user.password)
        if (!isValidPass) {
            throw createError(401, 'Credentials do not match')
        }

        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
        
        await User.findByIdAndUpdate({ _id: user.id }, { token })
        
        res.json({
            token,
        })
    } catch (e) {
        next(e)
    }
})

router.get('/logout', authorize, async (req, res, next) => {
    try {
        const { _id } = req.user
        await User.findByIdAndUpdate(_id, { token: '' })
        res.json({
            message: 'Logout successfully',
        })
    } catch (e) {
        next(e)
    }
})

router.get('/current', authorize, async (req, res, next) => {
    try {
        const { email, name } = req.user
        res.json({
            email,
            name,
        })
    } catch (e) {
        next(e)
    }
});

router.patch('/avatars', authorize, upload, async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { path: tempDir, originalName } = req.file;
        const [extension] = originalName.split('.').reverse();
        const newName = `${_id}.${extension}`;

        const uploadDir = path.join(
            __dirname,
            '../../',
            'public',
            'avatars',
            newName
        );

        const image = await Jimp.read(tempDir);
        await image.resize(250, 250).write(tempDir);

        await fs.rename(tempDir, uploadDir);
        const avatarURL = path.join('/avatars', newName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.status(201).json(avatarURL);
    } catch (e) {
        await fs.unlink(req.file.path);
        next(e);
    }
})

module.exports = router