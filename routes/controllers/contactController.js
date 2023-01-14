const {
  listContacts,
  getContactById,
} = require("../../models/contactsModels.js");

const getContacts = async (req, res) => {
  const contacts = await listContacts();
  //   console.log(contacts);
  res.status(200).json({
    contacts,
    status: "success",
  });
};

const getContactByIdController = async (req, res) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found!" });
  }
  return res.json({ contact });
};

module.exports = {
  getContacts,
  getContactByIdController,
};
