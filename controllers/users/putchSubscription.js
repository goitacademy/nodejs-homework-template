const { User } = require('../../models');

const putchSubscription = async (req, res) => {
    const { _id, subscription } = req.user;
    if (subscription === req.body.subscription) {
        res.status(400).json({message: 'Have already subscribed'})
    }
    const updatedUser = await User.findByIdAndUpdate(_id, { ...req.body }, {new: true});
    res.status(200).json(updatedUser)
}
module.exports = putchSubscription;