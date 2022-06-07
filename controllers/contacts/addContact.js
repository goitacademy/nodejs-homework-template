const contactsOperations = require("../../models/contacts");
// const contactsSchema = require("../../schemas/contactsSchema");

const addContact = async (req, res) => {
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: result,
    },
  });
};

module.exports = addContact;
