const { User } = require('../../models/user');

const logout = async (req, res) => {
    const { _id } = req.User;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
        status: "no Content",
        code: 204,
        message: "logout success"
    });
}

module.exports = logout;