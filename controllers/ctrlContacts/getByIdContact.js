const { contactsService } = require("../../services");
const { isValidNoNull } = require("../../helpers");

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsService.getOneContact(contactId);

  res.json(isValidNoNull(result));
};

module.exports = getByIdContact;
