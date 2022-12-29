const { User } = require("../../models");

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(201).json();
};

module.exports = logout;