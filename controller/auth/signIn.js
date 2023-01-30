const { User } = require("../../models");
const { RequestError, generateToken } = require("../../helpers");

const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(401, "Email is wrong");
    }

    if (!user.comparePassword(password)) {
        throw RequestError(401, "Password is wrong");
    }

    const token = generateToken(user);

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            token,
            user: {
                name: user.name,
                email: user.email,
                subscription: user.subscription,
            },
        },
    });
};

module.exports = signIn;
