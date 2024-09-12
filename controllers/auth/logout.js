const { Unauthorized } = require('http-errors');

const { User } = require('../../models/user');

const logout = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            throw new Unauthorized('Not authorized');
        }

        await User.findByIdAndUpdate(user._id, { token: null });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = logout;
