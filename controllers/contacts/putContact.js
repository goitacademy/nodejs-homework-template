const { HTTP404Error } = require("../../helpers/errorHandlers");
const { updateContact } = require("../../services/contacts");

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.json({ message: "missing fields", status: "failed", code: 400 });
  }

  const result = await updateContact(contactId, {
    name,
    email,
    phone,
  });
  if (!result) {
    throw new HTTP404Error(`There is no such contact with id: ${contactId}`);
  }
  return res.json({ data: result, status: "success", code: 200 });
};

module.exports = putContact;
