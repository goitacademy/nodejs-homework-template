const { Unauthorized } = require('http-errors');

const { User } = require('../../models');

const current = async (req, res) => {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
        throw Unauthorized('Not authorized')
    }

    res.json({
        status: 'success',
        code: 200,
        data: {
            user: {
                email: user.email,
                subscription: user.subscription
            }
        }
    })
};

module.exports = current;