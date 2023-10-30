const { Contact } = require("../../models");

const { controllerWrapper } = require("../../decorators");

const listContactsController = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = {
  listContactsController: controllerWrapper(listContactsController),
};
