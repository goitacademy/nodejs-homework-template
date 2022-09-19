const { contacts: operations } = require("../../services");

const add = async (req, res) => {
  const { _id: userId } = req.user;

  await operations.add(req.body, userId);

  res.status(200).json({ status: "success" });
};

module.exports = add;
