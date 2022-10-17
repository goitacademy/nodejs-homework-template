const {User} = require('../../models/user');

const updateSubscription = async(req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await User.findByIdAndUpdate(_id, { subscription }, { runValidators: true });
    res.status(201).json({
        status: 'success',
        code: 200,
        data: {
          user: {
            email: user.email,
            subscription: subscription
          }
        }
    })
};

module.exports = updateSubscription;