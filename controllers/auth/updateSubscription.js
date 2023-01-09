const { User } = require('../../models/user')

const updateSubscription = async (req, res) => {
    const { subscription } = req.body;
    const { _id } = req.user;

    const user = await User.findByIdAndUpdate(_id, { subscription }, { new: true, runValidators: true })
    console.log(user)

    res.json({
        subscription: user.subscription,
    })
}

module.exports = updateSubscription;