const { User } = require("../../models/user/index");

const subscriptionUpdate = async (req, res) => {
    const { _id } = req.user;
    const {subscription} = req.body;

    await User.findByIdAndUpdate(_id, subscription)

    res.json({ message: `Subscription successfully updated to ${subscription}`})
}

module.exports = subscriptionUpdate;