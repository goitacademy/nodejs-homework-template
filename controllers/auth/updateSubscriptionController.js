const User = require('../../models/auth')


const updateSubscriptionController = async (req, res, next) => {
    const { _id } = req.user;
    const { subscription } = req.body

    // console.log("subscription", subscription)

    if (subscription.length === 0) {
        res.status(400).json({ message: 'missing field subscription' })
        return
    }

    const updatedSubscription = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
    });

    if (updatedSubscription) {
        const { email, subscription } = updatedSubscription;
        res.json({
            status: 'success',
            code: 200,
            body: { email, subscription },
        })
    } else {
        res.status(404).json({
            status: 'error',
            message: `User not found`,
        })
    }
}

module.exports = updateSubscriptionController