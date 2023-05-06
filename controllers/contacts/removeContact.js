const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const removeContact = async (requirement, response) => {
  const result = await Contact.findByIdAndDelete(requirement.params.contactId);

  if (!result) {
    throw HttpError(404, "This contact was not found");
  }

  return response.status(200).json({ message: "This contact was deleted" });
};

module.exports = removeContact;
