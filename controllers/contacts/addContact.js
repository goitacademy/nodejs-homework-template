// const contactsOperations = require("../../models/contactsFunctions");
const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
  // const result = await contactsOperations.addContact(req.body);
  const result = await Contact.create(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
