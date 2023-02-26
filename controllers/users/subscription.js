const { UserModel } = require("../../models");

const subscription = async (req, res) => {
  const { subscription } = req.body;
  const { id } = req.user;
  const user = await UserModel.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
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

module.exports = subscription;
