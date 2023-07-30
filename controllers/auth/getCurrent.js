const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

module.exports =  ctrlWrapper(getCurrent)

