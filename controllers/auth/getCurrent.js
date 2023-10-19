const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, name, subscription } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      name,
      email,
      subscription,
    },
  });
};

module.exports = ctrlWrapper(getCurrent);
