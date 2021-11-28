/* eslint-disable quotes */
/* eslint-disable semi */
const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    message: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = listContacts;
