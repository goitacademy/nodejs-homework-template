const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");
const { model } = require("mongoose");

const register = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email is already in use',
            data: 'Conflict',
        })
    };

    const newUser = await User.create(req.body);
    
    res.status(201).json({
//         status: 'Created',
//         Content-Type: application/json,
// ResponseBody: {
//   "user": {
//     "email": "example@example.com",
//     "subscription": "starter"
//   }
      code: 201,
      data: {
        message: 'Registration successful',
      },
    })
}

module.exports = {
    register: ctrlWrapper(register),
    // login: ctrlWrapper(login),
}