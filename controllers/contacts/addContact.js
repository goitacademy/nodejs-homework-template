const contactsOperations = require("../../models/contactsFunctions");

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
