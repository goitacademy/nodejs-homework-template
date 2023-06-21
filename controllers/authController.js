const jwt = require('jsonwebtoken')
const userRolesEnum = require("../constants/userRolesEnum")
const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")
const AppError = require('../utils/appError')

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
})

exports.signup = catchAsync(async (req, res) => { 
    const newUserData = {
        ...req.body,
        role: userRolesEnum.STARTER,
    }
    const newUser = await User.create(newUserData)
    newUser.password = undefined;
    
    const token = signToken(newUser.id)
    
    newUser.token = token;

    await User.findByIdAndUpdate(newUser._id, { token: token }); 
    
    res.status(201).json({
        user: newUser,
    })
})

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) throw new AppError(401, 'Not authorized!');

    const passwordIsValid = await user.checkPassword(password, user.password);

    if (!passwordIsValid) throw new AppError(401, 'Not authorized!');

    user.password = undefined;

    const token = signToken(user.id);

    user.token = token;

    res.status(200).json({
        user,
    })
})