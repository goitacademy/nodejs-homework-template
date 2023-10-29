const { listContacts, getContactById } = require("../models/contacts.js");

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

module.exports = { getAllContacts, getById };
