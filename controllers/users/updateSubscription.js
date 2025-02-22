const { User } = require('../../models');

// const createError = require('http-errors');

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;

    const result = await User.findByIdAndUpdate(
        _id,
        { subscription },
        { new: true }
    );
    res.json({
        status: 'success',
        code: 200,
        data: { result },
    });
};

module.exports = updateSubscription;