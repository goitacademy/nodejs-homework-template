/* eslint-disable quotes */
/* eslint-disable semi */
const contactsOperations = require("../../model");

const addContact = async (req, res) => {
  const addContact = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: addContact,
  });
};

module.exports = addContact;
