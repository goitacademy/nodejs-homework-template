const { User } = require('../../models');

const patchSubscription = async (req, res) => {
    const { subscription } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, { subscription }, { new: true });

    if (!updatedUser) {
        res.status(404).json({status: "error", code:"404", message: "Not found"})
    }

    res.json({status: "success", code: 200, data:updatedUser})
}

module.exports = patchSubscription