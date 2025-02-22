const User = require('../../models/user.js');

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: null }, { new: true });
        return res.json({ message: "logged out" });
    } catch (error) {
        next(error);
    }
}

module.exports = logout;