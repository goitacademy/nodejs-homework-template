const bcrypt = require("bcrypt");
const createError = require("http-errors");
const { User } = require("../../models/user");

const signup = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, `This ${email} is already in use`);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
        email,
        password: hashPassword,
        subscription,
    });

    res.status(201).json({
        status: "success",
        code: 201,
        date: {
            user: {
                email: result.email,
                subscription: result.subscription,
            },
        },
    });
};

module.exports = signup;
