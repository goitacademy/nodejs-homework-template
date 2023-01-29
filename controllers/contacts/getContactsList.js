const { listContacts } = require("../../servises/contacts");

const getContactsListController = async (req, res, next) => {
  const contacts = await listContacts();
  if (!contacts) {
    return res
      .status(400)
      .json({ message: `Contacts not found, something wrong` });
  }
  res.json({ contacts, message: "Success!" });
};

module.exports = {
  getContacts: getContactsListController,
};
