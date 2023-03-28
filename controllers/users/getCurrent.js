const { User } = require("../../models");

const getCurrent = async (req, res, next) => {
  console.log(req.user);
};

module.exports = getCurrent;
