const {User} = require('../../models/user');

const updateSubscription = async(req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(_id, { subscription }, { runValidators: true });
    res.status(201).json({
        user: {
        email: user.email,
        subscription,
        },
    })
};

module.exports = updateSubscription;