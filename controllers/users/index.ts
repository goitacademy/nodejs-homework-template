const { update } = require("../../repository/users");
const { HTTP_STATUS_CODE } = require("../../libs/constants");

const getCurrentUser = async (req, res) => {
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    data: {
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
};

const updateSubscription = async (req, res) => {
  const user = await update(req.user.id, req.body);
  return res.json({
    status: "success",
    code: HTTP_STATUS_CODE.OK,
    message: "Subscription updated",
    data: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  getCurrentUser,
  updateSubscription,
};
export {};
