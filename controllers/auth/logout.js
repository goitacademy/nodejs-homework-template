const { User } = require("");

const { ctrlWrapper } = require("../../decorators");

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
};

module.exports = {
    logout: ctrlWrapper(logout),
};