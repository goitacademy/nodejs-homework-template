const { RequestError } = require("../../helpers");
const { updateContact } = require("../../services");
const contactValidator = require("../../middleware");

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const body = req.body;

  const { error } = contactValidator.validate(req.body);

  if (error) {
    throw new RequestError(400, error.details[0].message);
  }

  if (!Object.keys(body).length) {
    throw new RequestError(400, "Missing fields");
  }

  const contactToUpdate = await updateContact(contactId, body, owner, {runValidators: true});

  if (!contactToUpdate) {
    throw new RequestError(404, `Contact with id(${contactId}) not found`);
  }

  res.status(200).json(contactToUpdate);
};

module.exports = updateContactController;
