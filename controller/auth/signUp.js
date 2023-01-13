const { User } = require("../../models");
const gravatar = require("gravatar");
const { RequestError } = require("../../helpers");

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw RequestError(409, "Email in use");
    }

    const avatarURL = gravatar.url(email, { protocol: "https" });

    const newUser = new User({ name, email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                name: newUser.name,
                email: newUser.email,
                subscription: newUser.subscription,
                avatarURL: newUser.avatarURL,
            },
        },
    });
};

module.exports = signUp;