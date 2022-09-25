// const { getContactById } = require("../../models/contacts");
const { getCollection } = require("../../db/connection");
const ObjectId = require("mongodb").ObjectId;
// const { contacts } = require("..");
const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { Contacts } = await getCollection();
  // const contacts = await Contacts.find({}).toArray();

  const contact = await Contacts.find[{ _id: new ObjectId(contactId) }];
  console.log(contact);
  res.json(contact);
  // const contactById = await
  // try {

  //   const searchContact = await getContactById(contactId);
  //   if (!searchContact) {
  //     throw new Error(`Not found`);
  //   }
  //   res.status(200);
  //   res.json({ contact: searchContact });
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};
module.exports = getContactById;
