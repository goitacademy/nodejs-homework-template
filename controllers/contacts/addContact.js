const contactOperations = require("../../models/contacts");

const addContact = async (req, res, next) => {
  const result = await contactOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

module.exports = addContact;
