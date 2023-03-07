
const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);

const contactsOperations = require("../../models/contacts");

const addContact = async (req, res, next) => {
  const result = await contactsOperations.addContact(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
