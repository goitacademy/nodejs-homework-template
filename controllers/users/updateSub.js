const { NotFound } = require("http-errors");
const { User } = require("../../models/user");

const updateSub = async (req, res) => {
    const { _id} = req.user;
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!user) {
        throw new NotFound("Not found");
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
        email: user.email,
      subscription: user.subscription,
      },
        },
    });
};

module.exports = updateSub;