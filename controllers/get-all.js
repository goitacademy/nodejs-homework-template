const { ContactModel } = require("../models");

const getAll = async (req, res, next) => {
  const result = await ContactModel.find();
  res.json(result);
};

module.exports = {
  getAll,
};
