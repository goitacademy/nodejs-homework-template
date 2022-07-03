const { User } = require('../../models');

const logout = async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { token: null });
    res.status(204).json();
};

module.exports = logout;