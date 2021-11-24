const { NotFound } = require("http-errors");
const ContactsModel = require("../../model/contacts");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await ContactsModel.updateContact(contactId, req.body);
  if (!contact) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = updateContactById;
