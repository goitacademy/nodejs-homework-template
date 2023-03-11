const { updateContact } = require("../../services");
const { isEmpty, RequestError } = require("../../helpers");
const contactValidator = require("../../middleware");

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const body = req.body;

  const { error } = contactValidator.validate(req.body);

  if (error) {
    throw RequestError(400, error.details[0].message);
  }

  if (isEmpty(body)) {
    throw RequestError(400, "Missing fields");
  }

  const contactToUpdate = await updateContact(contactId, body, owner);

  if (!contactToUpdate) {
    throw RequestError(404, "Not found");
  }

  return res.status(200).json(contactToUpdate);
};

module.exports = updateContactController;
