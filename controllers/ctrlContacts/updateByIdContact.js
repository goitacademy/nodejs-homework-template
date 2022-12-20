const { contactsService } = require("../../services");
const { isValidNoNull } = require("../../helpers");

const updateByIdContact = async (req, res) => {
  const {
    body,
    params: { contactId },
  } = req;

  const result = await contactsService.updateContact(contactId, body);

  res.status(201).json(isValidNoNull(result));
};

module.exports = updateByIdContact;
