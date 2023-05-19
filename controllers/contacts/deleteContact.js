const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "Success",
    code: 200,
    message: "Contact deleted",
    data: {
      contact,
    },
  });
};

module.exports = deleteContact;
