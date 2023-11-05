const { Contact } = require("../../models");

const { controllerWrapper } = require("../../decorators");

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
  addContactController: controllerWrapper(addContactController),
};
