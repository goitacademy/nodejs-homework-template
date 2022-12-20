const { contactsService } = require("../../services");
const { isValidNoNull } = require("../../helpers");

const deleteByIdContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsService.removeContact(contactId);

  await isValidNoNull(result);

  res.json(`Contact by 'Id' - '${contactId}' deleted`);
};

module.exports = deleteByIdContact;
