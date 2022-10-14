const { Conflict } = require('http-errors');
const { User } = require('../../models');
const bcrypt = require('bcrypt');

const signup = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict('Email in use');
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ email, password: hashPassword });
    res.status(201).json({
        status: "created",
        code: 201,
        data: {
            email,
        }
    })
};

module.exports = signup;