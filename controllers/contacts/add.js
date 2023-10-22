const { Contact } = require("../../models/Contact");

const { ctrlWrapper } = require("../../decorators");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = ctrlWrapper(add);
