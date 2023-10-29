const { Contact } = require("../models");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../decorators");

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json(result);
};

module.exports = {
  getContactByIdController: controllerWrapper(getContactByIdController),
};
