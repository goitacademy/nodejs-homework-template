const { User } = require("../../model");

const getCurrent = async (req, res) => {
  console.log(req.user);
};

module.exports = getCurrent;
