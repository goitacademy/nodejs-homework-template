const contacts = require("../../models/contacts");
const { checkNull } = require("../../helpers");

const deleteByIdContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.removeContact(contactId);

  checkNull(result);

  res.json(`Contact by 'Id' - '${contactId}' deleted`);
};

module.exports = deleteByIdContact;
