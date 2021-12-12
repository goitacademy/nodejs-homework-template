const { User } = require("../../model/users");
const { updateSubSchema } = require("../../model/users");
const { NotFound } = require("http-errors");

const updateSub = async(req, res) => {
    const { error } = updateSubSchema.validate(req.body);
    if (error) {
        throw new Error(error.message);
    }
    const updateStatus = await User.findByIdAndUpdate(
        req.user._id, { subscription: req.body.subscription }, { new: true }
    ).select("_id email subscription");

    if (updateStatus) {
        return res.json(updateStatus);
    }
    throw new NotFound("Not Found");
};
module.exports = updateSub;