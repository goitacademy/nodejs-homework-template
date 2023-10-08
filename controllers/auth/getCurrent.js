const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { name, email, subscription } = req.user;

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      email,
      name,
      subscription,
    },
  });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };
