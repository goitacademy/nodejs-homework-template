const { User } = require("../models/userModel.js");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');


// const { lineBreak } = require("../services")

//-----------------------------------------------------------------------------
const registration = async (email, password) => {
    const user = new User({
        email,
        // password: await bcrypt.hash(password, 10)
        password
    });
    await user.save();
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw Error(`No user with email: '${email}' found`)
    }
    if (!await bcrypt.compare(password, user.password)) {
        throw Error(`Wrrong password`)
    }

    const token = jwt.sign({
        _id: user.id,
        email: user.email,
        createdAt: user.createdAt,
    }, process.env.JWT_SECRET);
    // lineBreak();
    console.log("token:".red, token.green); //!
    // lineBreak();
    return token;
};

module.exports = {
    registration,
    login
};


