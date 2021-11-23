/* eslint-disable quotes */
/* eslint-disable semi */
const contactsOperations = require("../../model");

const listContacts = async (req, res) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    message: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = listContacts;
