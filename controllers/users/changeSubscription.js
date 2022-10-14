const { User } = require('../../models');

const changeSubscription = async (req, res) => {
    const { _id, email } = req.user;
    const { subscription } = req.body;
    await User.findByIdAndUpdate(_id, { subscription }, { new: true });
    res.json({
        status: "success",
        code: 200,
        data: {
            email,
            subscription
        }
    });
}

module.exports = changeSubscription;