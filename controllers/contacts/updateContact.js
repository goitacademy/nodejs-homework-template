const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateContact = async (requirement, response) => {
  const { contactId } = requirement.params;
  const result = await Contact.findByIdAndUpdate(contactId, requirement.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found update");
  }

  return response.status(200).json(result);
};

module.exports = updateContact;
