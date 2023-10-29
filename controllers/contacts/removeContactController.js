const { Contact } = require("../models");

const { HttpError } = require("../helpers");

const { controllerWrapper } = require("../decorators");

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  removeContactController: controllerWrapper(removeContactController),
};
