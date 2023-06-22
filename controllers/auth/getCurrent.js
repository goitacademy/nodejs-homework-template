const { wrapper } = require("../../helpers");

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports = wrapper(getCurrent);
