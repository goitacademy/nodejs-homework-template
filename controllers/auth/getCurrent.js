const { ctrlWrapper } = require("../../utils");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;

  res.json({
    name,
    email,
  });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };
