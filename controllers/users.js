const { Conflict } = require('http-errors');
const { User } = require('../models/');

const signup = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    console.log('hi');
    // if (user) {
    //     throw new Conflict("User already exists.")
    //     // req.status(409).json({
    //     //     status: 'error',
    //     //     code: 409,
    //     //     message: "User already exists."
    //     // });
    //     // return;
    // }
    // const result = await User.create(req.body);
    // res.status(201).json({
    //     status: 'success',
    //     code: 201,
    //     message: 'Sign up was succssful.'
    // })
};

const login = async (req, res) => {
    
};

const logout = async (req, res) => {
    
};

module.exports = {
    signup,
    login,
    logout
}