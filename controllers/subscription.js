const { User } = require("../models/schema");

const subscription = async (req, res) => {
    const { subscription } = req.body;
    const { id } = req.user;

    try {
        await User.updateOne({ _id: id }, { subscription: subscription });
        res.json({
        status: "success",
        code: 200,
        data: { id, subscription },
        message: `User subscription is ${subscription}`,
        });
        
    } catch (error) {
        res.status(400).json({
        status: "error",
        code: 400,
        message: "Bad Request yolo",
        });
    }
};

module.exports = { subscription };
