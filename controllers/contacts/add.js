const { ContactModel } = require("../../models/contact.model");

const add = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const result = await ContactModel.create({ name, email, phone, favorite });
  res.status(201).json(result);
};

module.exports = {
  add,
};
