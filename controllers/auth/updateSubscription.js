const { User } = require('../../models/user')

const updateSubscription = async (req, res) => {
    const { subscription
        // : newSubscription
    } = req.body;
    const { _id } = req.user;

    // console.log(newSubscription)

    const user = await User.findByIdAndUpdate(_id, {
        subscription
            // : newSubscription
    }, { new: true })
    console.log(user)

    res.json({
        subscription: user.subscription,
    })
}

module.exports = updateSubscription;