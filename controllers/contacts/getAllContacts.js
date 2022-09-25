// const { listContacts } = require("../../models/contacts");
const { getCollection } = require("../../db/connection");
const getAll = async (req, res, next) => {
  const { Contacts } = await getCollection();
  const contacts = await Contacts.find({}).toArray();

  res.json(contacts);
  // try {
  //   const list = await listContacts();
  //   res.status(200);
  //   res.json({ contacts: JSON.parse(`${list}`) });
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};
module.exports = getAll;
