const { User } = require('../../models/user');

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;

    if (!['starter', 'pro', 'business'].includes(subscription)) {
        throw HttpError(400, 'Invalid subscription value');
    }

    const updatedUser = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

    res.json(updatedUser);
};

module.exports = updateSubscription;
