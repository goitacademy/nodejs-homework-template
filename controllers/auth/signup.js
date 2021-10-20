const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

const signup = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Already registered");
    }

    const avatarURL = gravatar.url(email);

    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
        status: "success",
        code: 201,
        message: "Signup success",
    });
};

module.exports = signup;