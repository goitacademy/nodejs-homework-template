const { User } = require("../../models");

const updateSubscription = async (req, res) => {
    const { id } = req.user;
    const data = await User.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
    });

    res.status(200).json({
        status: "success",
        code: 200,
        data: {
            user: {
                name: data.name,
                email: data.email,
                subscription: data.subscription,
            },
        },
    });
};

module.exports = updateSubscription;
