const { Contact } = require("../../models");

const { HttpError } = require("../../helpers");

const { controllerWrapper } = require("../../decorators");

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  removeContactController: controllerWrapper(removeContactController),
};
