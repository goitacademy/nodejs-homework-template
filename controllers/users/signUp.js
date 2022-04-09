const { User } = require('../../models');
const {Conflict} = require("http-errors");
const bcrypt = require('bcrypt');


const signUp = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        res.status(409).json({ message: "Email in use" });
    };

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const {subscription} = await User.create({ email, password: hashPassword });

    res.status(201).json({
        status: "success", code: 201, user: {
            email,
            subscription,
    }})
}

module.exports = signUp;