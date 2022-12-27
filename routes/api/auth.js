const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { createError, createHashPass } = require('../../helpers')

const User = require('../../models/user');
const { authorize } = require('../../middlewares')

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
        
        const hashPassword = await createHashPass(password)
        const newUser = await User.create({ email, name, password: hashPassword })
        res.status(201).json({
            email: newUser.email,
            name: newUser.name,
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
})

module.exports = router