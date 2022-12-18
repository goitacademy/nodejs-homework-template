const User = require("../../models/users");
const { Conflict } = require("http-errors");

const bcrypt = require("bcryptjs");

const register = async (req, res) => {

    const { password, email, subscription, token } = req.body;
    const user = await User.findOne({ email });
       if (user) {
        throw new Conflict(`Email ${email} in use`);
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await User.create({ password: hashPassword, email, subscription, token })
    res.status(201).json({
        status: "Created",
        code: 201,
        ResponseBody: {
        user: {
            email,
            subscription,
        }
}
    })
}

module.exports = register;