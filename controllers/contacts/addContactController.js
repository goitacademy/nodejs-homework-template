const { Contact } = require("../models");

const { controllerWrapper } = require("../decorators");

const addContactController = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = {
  addContactController: controllerWrapper(addContactController),
};
