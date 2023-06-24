const bcrypt = require('bcrypt');

const {HttpError} = require("../../helpers");
const { User } = require("../../models/user/index");

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, `User with ${email} email already exist`)
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });

    res.status(201).json({
        user: {
        email: newUser.email,
        name: newUser.name,
        subscription: newUser.subscription,
    }})
}

module.exports = registerUser;