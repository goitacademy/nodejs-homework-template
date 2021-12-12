const { User } = require("../../model/users");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { compareHashPass } = require("../../hashpas/hashPassword");
const { SECRET_KEY } = process.env;
const signin = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const checkPass = compareHashPass(password, user.password);
    if (!user || !checkPass) {
        throw new Unauthorized("Email or password is wrong");
    }
    const payload = {
        id: user.id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        status: "succsess",
        code: 200,
        data: {
            token,
            email,
            subscription: user.subscription,
        },
    });
};

module.exports = signin;