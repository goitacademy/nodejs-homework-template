const { User } = require("../../models");

const updateSubscription = async (req, res, next) => {
    const { subscription } = req.body;

    const result = await User.findByIdAndUpdate(
        req.user._id,
        { subscription },
        { new: true }
    );
    res.status(200).json({ message: result });
};

module.exports = updateSubscription;