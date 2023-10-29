const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
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
async function createContact(req, res, next) {
  try {
    const result = await addContact(req.body);
    res.status(201).json({ result });
  } catch (error) {
    console.log(error.message);
    next(e);
  }
}

async function updateById(req, res, next) {
  const { contactId } = req.params;
  try {
    const result = await updateContact(contactId, req.body);
    if (result) {
      res.status(200).json({ messgage: "contact updated", result });
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
module.exports = {
  getAllContacts,
  getById,
  deleteById,
  createContact,
  updateById,
};
