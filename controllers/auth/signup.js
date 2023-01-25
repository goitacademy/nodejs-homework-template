const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt")

const { User } = require("../../models/index")

const signup = async (req, res) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw new Conflict(`Email ${email} already in use`)
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    const result = await User.create({ email, password: hashPassword, subscription });
    res.status(201).json({
        Status: "Created",
        ResponseBody: {
            user: {
                email,
                subscription
            }
        }
    })
}

module.exports = {
    signup
}