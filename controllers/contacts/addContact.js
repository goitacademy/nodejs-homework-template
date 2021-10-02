const { InternalServerError } = require("http-errors");
const contactsOperations = require("../../model/contacts");

const addContact = async (req, res, next) => {
  const newContact = await contactsOperations.addContact(req.body);
  if (!newContact) {
    throw new InternalServerError("Unable to add, try again later");
  }
  res.json({
    status: "Succeed",
    code: 201,
    data: newContact,
  });
};

module.exports = addContact;
