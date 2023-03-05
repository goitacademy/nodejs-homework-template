const { listContacts } = require("../services");

const getContactsListCtrl = async (_, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getContactsListCtrl;
