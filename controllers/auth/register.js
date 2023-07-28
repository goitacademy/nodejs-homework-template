const bcrypt = require("bcryptjs");

const { User } = require("");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email is use");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const compareHashedPassword = await bcrypt.compare(password, hashedPassword);

    console.log(compareHashedPassword);

    const newUser = await User.create({ ...req.body, password: hashedPassword });

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

module.exports = {
    register: ctrlWrapper(register),
};