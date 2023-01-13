const { listContacts, contacts } = require("../../models/contactsModels");

const getContacts = (req, res) => {
  listContacts();
  //   console.log(contacts);
  res.json({
    contacts,
    code: 200,
    status: "success",
  });
};

module.exports = {
  getContacts,
};
