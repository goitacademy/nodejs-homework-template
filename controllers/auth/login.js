const { USER } = require("../../models");
const { SECRET_KEY } = require("../../helpers/evn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const login = async (req,res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });

const passCompare = bcrypt.compareSync(password, user.password);

    if (!user || !passCompare) {
        res.status(401).json({
            status: "Unauthorized",
            code: 401,
            message: "Email or password is wrong",
            });
    return;
    }

const payload = { id: user._id };
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

await User.findByIdAndDelete(user._id, { token });

res.json({
    status: "OK",
    code: 200,
    message: "Login success",
    data: {
        token,
        userData: {
            email: user.email,
            subscription: user.subscription,
            avatarURL: user.avatarURL,
        },
    },
});
};

module.exports = login;