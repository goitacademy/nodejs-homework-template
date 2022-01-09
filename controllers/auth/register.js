const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../../models/");

async function register(req, res) {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`Email in use`)
    }
    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, subscription, avatarURL });
    newUser.setPassword(password);
    newUser.save();
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                email,
                subscription: subscription || newUser.subscription,
                avatarURL
            }
        }
    });
}

module.exports = register;