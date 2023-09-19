const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { User } = require('../models/User');

const { HttpError } = require('../helpers/index');

const { ctrlWrapper } = require('../decorators/index');

require('dotenv').config();

const { JWT_SECRET } = process.env;


const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        // username: newUser.username,
        email: newUser.email,
    })
}

const signin = async (req, res) => {
    console.log(req);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {

        throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

    res.json({
        token,
    })
}

module.exports = {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
}
