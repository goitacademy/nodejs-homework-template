const { User } = require("../../models");

const updateSubscription = async (req, res) => {
    const { subscription } = req.body;
    const { _id, email } = req.user;

    await User.findByIdAndUpdate(_id, { subscription }, { new: true });

    res.json({
        status: "Success",
        code: 200,
        message: "User subscription updated",
        data: {
            userData: {
                email,
                subscription,
            },
        },
    })

};

module.exports = updateSubscription;