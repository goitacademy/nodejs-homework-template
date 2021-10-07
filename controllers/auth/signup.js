const { User } = require("../../models");
const { Conflict } = require("http-errors");
const { sendSuccessRes } = require('../../helpers');
// const bcrypt = require("bcryptjs");

const signup = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Already signup")
    }
    const newUser = new User({ email })
    newUser.setPassword(password);
    await newUser.save();
    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    // const newUser = { email, password: hashPassword };
    // const result = await User.create(newUser);
    sendSuccessRes(res, null, 201)
    //  res.status(201).json({
        // status: "success",
        // code: 201,
        // message: "Success register"
    // });
};

module.exports = signup;
