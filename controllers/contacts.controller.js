const {listContacts, getContactById, addContact, removeContact, updateContact} = require('../models/contacts');
const { HttpError } = require("../models/helpers/index.js");

async function getContactsService(req, res) {
  const { limit } = req.query;
  const contacts = await listContacts({limit});
  res.json(contacts);
};

async function getContactService(req, res, next) {
  const {id} = req.params;
    const contact = await getContactById(id);
    console.log(contact);
  if (!contact) {
    return next(new HttpError(404, "Contact not found"));
  }
  return res.json(contact);
}

async function creacteContactService(req, res, next) {
    const { name, email, phone } = req.body;
    console.log(name, email, phone);
    const newContact = await addContact(name, email, phone);
    res.status(201).json(newContact);
}

async function deleteContactService(req, res, next) {
    const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
   throw new HttpError(404, "Not found");;
        // return next(new HttpError(404, "Not found"));
    }
    await removeContact(id);
    return res.status(200).json({ message: "Contact deleted" });
}
 
async function updateContactService(req, res, next) {
    const { id } = req.params;
    const updatedContact = await updateContact(id, req.body);
    
    if (!updatedContact) {
        return next(new HttpError(404, "Contact not found"));
    }
    return res.status(200).json(updatedContact);
}


module.exports = {
    getContactsService,
    getContactService,
    creacteContactService,
    deleteContactService,
    updateContactService,
};
