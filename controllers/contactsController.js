const { listContacts, getContactById, addContact, removeContact, updateContact } = require("../models/contacts");
const { validateAddContact } = require("../middlewares/validator");



async function getContactsCtrl(req, res) {
    try {
        const contacts = await listContacts();
        res.status(200).json(contacts);
      } catch (error) {
        console.log(error.message);
      }
};

async function getContactByIdCtrl(req, res) {
    try {
        const id = req.params.contactId;
        const wantedContact = await getContactById(id);
        if (!wantedContact) {
          res.status(404).json({ message: "Not found" });
        }
        res.status(200).json(wantedContact);
      } catch (error) {
        console.log(error.message);
      }
};

async function addContactCtrl(req, res) {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
          return res.status(400).json({ message: "missing required name field" });
        }
        const { error, value } = validateAddContact(req.body);
        if (error) {
          res.status(400).send(error.message);
          return
        }
        const addedContact = await addContact(req.body);
        res.status(201).json(addedContact);
      } catch (error) {
        console.log(error.message);
      }
};

async function removeContactCtrl(req, res) {
    try {
        const { contactId } = req.params;
        const deletedContact = await removeContact(contactId);
        if (!deletedContact) {
          return res.status(404).json({ message: "Not found" });
        }
        
        res
          .status(200)
          .json({ message: `contact '${deletedContact.name}' deleted` });
      } catch (error) {
        console.log(error.message);
      }
};

async function updateContactCtrl(req, res) {
    try {
        const id = req.params.contactId;
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
          return res.status(400).json({ message: "missing fields" });
        }
        const { error, value } = validateAddContact(req.body);
        if (error) {
          res.status(400).send(error.message);
        }
    
        const updatedContact = await updateContact(id, req.body);
    
        if (updatedContact === null) {
          res.status(404).json({ message: "Not found" });
        }
    
        res.json(updatedContact);
      } catch (error) {
        console.log(error.message);
      }
};

module.exports = {
    getContactsCtrl,
    getContactByIdCtrl,
    addContactCtrl,
    removeContactCtrl,
    updateContactCtrl
}