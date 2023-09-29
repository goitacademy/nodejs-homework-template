const { User, hashPassword } = require("../models/user");

const createUser = async (email, password) => {
    const hashedPassword = hashPassword(password);
    try {
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.log(error);
    }
};

const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
};

const getUserByemail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

const getUserByToken = async (token) => {
    const user = await User.findOne({ token });
    return user;
};

const updateToken = async (_id, token) => {
    const user = await User.findByIdAndUpdate(_id, { token });
    return user;
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).send();
};

module.exports = { createUser, getUserById, getUserByemail, getUserByToken, updateToken, logout };