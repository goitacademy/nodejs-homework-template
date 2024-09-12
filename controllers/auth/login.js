const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const SECRET_KEY = require("");

const { User } = require("");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
        id: user.id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
    });
};

module.exports = {
    login: ctrlWrapper(this.login),
};