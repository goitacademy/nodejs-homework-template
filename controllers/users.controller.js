const express = require('express')
const jwt = require('jsonwebtoken');
const User = require("../service/schemas/users");
require('dotenv').config()
const secret = process.env.SECRET

const signUp = async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).lean();
        if (user) {
            return res.status(409)
            .json({
                status: 'conflict',
                code: 409,
                message: 'Email in use',
            });
        }
        try {
            const newUser = new User({ email });
            newUser.setPassword(password)
            await newUser.save()
            return res.status(201).json({
                status: 'Created',
                code: 201,
                ResponseBody: {
                    user: {
                        email: email,
                        subscription: 'starter',
                    },
                },
            })
        } catch (error) {
            next(error);
        }
}

const logIn = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if(!user || !user.validPassword(password)) {
        return res.status(400).json({
            status: 'Bad request',
            code: 400,
            message: 'Incorrect login or password',
        })
    }
    const payload = {
        id: user.id,
    }
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
   return res.json({
        status: 'success',
        code: 200,
        data: {
            token,
        }
    })
}


const logOut = async ( req, res, next) => {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, { token: null});
    if(!user) {
        return res.status(401).json({
            status: 'Unauthorized',
            code: 401,
            message: 'Not authorized'
        })
    }

    res.status(204).json({
        status: 'No content',
        code: 204,
        message: 'Logged out'
    })
}


const currentUser = async (req, res) => {
    const { _id, email } = req.user;
    const user = await User.findById(_id)
    if(!user) {
        return res.status(401).json({
            status: 'Unauthorized',
            code: 401,
            message: 'Unauthorized',
        })
    }
    res.status(200).json({
        status: 'OK',
        code: 200,
        ResponseBody: {
            email: email,
            id: _id,
            subscription: 'starter'
        }
    })
}


module.exports = {
    signUp,
    logIn,
    logOut,
    currentUser
}