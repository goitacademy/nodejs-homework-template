const { User } = require("../../models/index");

const getCurrent = async (req, res) => {
  console.log(req.user);
};

module.exports = getCurrent;
