const {User} = require('../../models/user');

const updateSubscription = async(req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(_id, { subscription });
    res.status(201).json({
        email: user.email,
        subscription,
    })
};

module.exports = updateSubscription;