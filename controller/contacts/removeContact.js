const { NotFound } = require("http-errors");
const ContactsModel = require("../../model/contacts");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactsModel.removeContact(contactId);
  if (!contact) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      contact,
    },
  });
};

module.exports = removeContact;
