const { User } = require("../../models");

const changeSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    console.log(subscription);

    const user = await User.findById(_id);

    console.log(user);

    user.subscription = subscription;

    res.json({
      status: "Success",
      code: 200,
      data: { result: user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = changeSubscription;
