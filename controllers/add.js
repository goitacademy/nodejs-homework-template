const { ContactModel } = require("../models");

const add = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const result = await ContactModel.create({ name, email, phone });
  res.status(201).json(result);
};

module.exports = {
  add,
};
