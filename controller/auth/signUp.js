const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw RequestError(409, "Email in use");
    }

    const newUser = new User({ name, email });
    newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: { name: newUser.name, email: newUser.email, subscription: newUser.subscription },
        },
    });
};

module.exports = signUp;
