const { NotFound } = require('http-errors');
const { User } = require('../../models');
const { sendSuccessfulRes } = require('../../helpers');

const updateSubscription = async (req, res) => {
    console.log(req.params);
    const { userId } = req.params;
    const { subscription } = req.body;

    const result = await User.findByIdAndUpdate(userId, {subscription}, {new: true});
    if (!result) {
        throw new NotFound(`User was not found`);
    }
    res.json({
        status: 'success',
        code: 200,
        user: {
            email: result.email,
            subscription: result.subscription
        }
    })
};

module.exports = updateSubscription;