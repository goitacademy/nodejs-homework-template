const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getById = async (requirement, response) => {
  const result = await Contact.findById(requirement.params.contactId);
  if (!result) {
    throw HttpError(404, "This contact was not found");
  }
  return response.json(result);
};

module.exports = getById;
