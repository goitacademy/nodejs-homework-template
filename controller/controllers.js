const {
  listContacts,
  getContactById,
  removeContact,
} = require("../models/contacts.js");

async function getAllContacts(req, res, next) {
  const contactList = await listContacts();
  res.status(200).json({ contactList });
}

async function getById(req, res, next) {
  const { contactId } = req.params;
  try {
    const foundConctact = await getContactById(contactId);
    if (foundConctact) {
      res.status(200).json({ foundConctact });
    } else {
      res.status(404).json({ messgage: `Not found contact id : ${contactId}` });
    }
  } catch (error) {
    console.log(error.messgage);
    next(error);
  }
}
async function deleteById(req, res, next) {
  const { contactId } = req.params;
  try {
    const deletedContact = await removeContact(contactId);
    if (deletedContact) {
      res.status(200).json({ message: "Deletion Successful" });
    } else {
      res
        .status(404)
        .json({ message: `No Contact Found with Id :${contactId}` });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}
module.exports = { getAllContacts, getById, deleteById };
