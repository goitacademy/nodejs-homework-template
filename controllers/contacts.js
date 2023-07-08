const path = require("path")
const {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
  } = require(path.resolve(__dirname, "../models/contacts"));

  const { httpError, ctrlWrapper } = require(path.resolve(__dirname, "../helpers"))

  const getAll = async (req, res) => {
      const contacts = await listContacts();
      if(!contacts) {
        throw httpError(404, "Not found")
      }
      res.status(200).json({ contacts });
  };

  const getById = async (req, res) => {
    const contactId = req.params.contactId; 
    const contactById = await getContactById(contactId);
    console.log('contactById: ', contactById)
    if(!contactById) {
      throw httpError(404, "Not found")
    }
    res.status(200).json({ contactById });
  }

  const add = async (req, res) => {
    const { name, email, phone } = req.body;
  const newContact = await addContact({ name, email, phone }); 

  res.status(201).json({ newContact });
}

const deleteById = async (req, res) => {
      const contactId = req.params.contactId;
      const removedById = await removeContact(contactId);
  
      if(!removedById) {
        throw httpError(404, "Not found")
      }  
      res.json({
        message: "Delete success"
      })  
  }

  const updateContactById = async (req, res) => {
    const contactId = req.params.contactId; 
    const { name, email, phone } = req.body; 
  
    const newContact = { name, email, phone };
  
    const updatedContact = await updateContact(contactId, newContact);
    if(!updatedContact) {
      throw httpError(404, "Not found")
    }
  
    res.json({ updatedContact });
  }

  
  module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateContactById: ctrlWrapper(updateContactById),
  }