const User = require("../../models/users");

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.json({
        status: "No Content",
        code: 204
    });
}

module.exports = logout;