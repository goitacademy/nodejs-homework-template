const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const update = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;
  const updatedContact = await contactsOperations.updateContact(id, body);
  if (!updatedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    data: {
      updatedContact,
    },
  });
};

module.exports = update;
