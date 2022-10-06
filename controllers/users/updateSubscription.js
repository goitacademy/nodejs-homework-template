const createError = require('http-errors');
const { User } = require('../../models/index');

const updateSubscription = async (req, res) => {
    const { userId } = req.params;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(
        userId, { subscription }, { new: true });

    if (!result) {
        throw createError(404, `User with id=${userId} not found`)
    }

    res.json({ status: 'success', code: 200, data: { result } })
}

module.exports = updateSubscription;