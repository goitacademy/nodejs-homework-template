const ContactsModel = require("../../models");

const getContacts = async (req, res) => {
  const contactsList = await ContactsModel.find();
  res.json({
    status: "success",
    code: 200,
    data: contactsList,
  });
};

module.exports = getContacts;
