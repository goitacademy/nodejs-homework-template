const contacts = require("../../models/contacts");
const { checkNull } = require("../../helpers");

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.getById(contactId);

  res.json(checkNull(result));
};

module.exports = getByIdContact;
