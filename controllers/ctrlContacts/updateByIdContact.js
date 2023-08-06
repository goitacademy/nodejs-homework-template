const { contactsService } = require("../../services");
const { isValidateNoNull } = require("../../helpers");

const updateByIdContact = async (req, res) => {
  const {
    params: { contactId },
    user: { _id: owner },
    body,
  } = req;

  const result = await contactsService.updateContact(contactId, owner, body);

  res.status(201).json(isValidateNoNull(result));
};

module.exports = updateByIdContact;