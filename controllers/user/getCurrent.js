const { decoratorCtrl } = require("../../helpers");
const { status } = require("../../consts");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    ...status.USER_CURRENT,
    user: { email, subscription },
  });
};

module.exports = decoratorCtrl(getCurrent);
