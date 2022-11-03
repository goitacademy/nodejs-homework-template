const { listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact } = require("../models/contacts")

    
const getContact = async (req, res, next) => {
   const contacts = await listContacts();
  res.status(200).json({ contacts })
}

const listContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
    if (contact === null) {
        return next()
    }
  res.status(200).json({ contact });
}

const postContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const nemContact = await addContact(name, email, phone);
  res.status(201).json({ nemContact })
}

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact === null) {
   return next()
   }
  res.status(200).json({ message: "contact deleted" });
}

const putContact = async (req, res, next) => {
const body = req.body;
const { contactId } = req.params;
const updatedContact = await updateContact(contactId, body);
if (updatedContact === undefined) {
   const error = new Error("missing fields");
        error.status = 400;
        return next(error);
        }
if (updatedContact === null) {
   return next()
   }
    res.status(200).json({ updatedContact });
}
  
module.exports = { getContact, listContactById, postContact, deleteContact, putContact,  };