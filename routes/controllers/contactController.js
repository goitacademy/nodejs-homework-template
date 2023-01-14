const { listContacts } = require("../../models/contactsModels.js");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  //   console.log(contacts);
  res.status(200).json({
    contacts,
    status: "success",
  });
};

module.exports = {
  getContacts,
};
