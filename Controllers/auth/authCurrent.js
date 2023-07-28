const { ctrlWraper } = require("../../Helpers");

const current = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

module.exports = ctrlWraper(current);
