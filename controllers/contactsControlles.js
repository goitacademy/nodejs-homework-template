const { listContacts, getContactById, addContact, removeContact, updateContact } = require("../models/contacts")
    // ADD 
const getContact = async (req, res, next) => {
    const getListAll = await listContacts()
    res.status(200).json({ message: getListAll, status: "success" })
  }

// SEARCH ID
const getContactId = async (req, res, next) => {
    const getItemId = await getContactById(req.params.contactId, req.body)
    if(getItemId){
      return res.status(200).json({ message: getItemId, status: "success" })
    }
    else {
      res.status(404).json({ message: 'not ID', status: "error" })
    }
    
  }

// POST 
const getContactPost = async (req, res, next) => {
    const addItemContact = await addContact(req.body)
    if(addItemContact){
  
      return res.status(201).json({ message: addItemContact, status: "success" })
    } else {
      res.status(404).json({ message: "Not found", status: "errorr" })
    }
  }

// DELETE
const getContactDelete = async (req, res, next) => {
    const deleteItemId = await removeContact(req.params.contactId)
    if(deleteItemId){
      return res.status(200).json({ message: "contact deleted", status: "success" })
    } 
      return res.status(404).json({ message: "Not found" })
    
  }

// CHANGE
const getContactPut = async (req, res, next) => {
    const putchItem = await updateContact(req.params.contactId, req.body)
    res.status(200).json({ message: putchItem, status: "success" })
  }


module.exports = {
    getContact,
    getContactId,
    getContactPost,
    getContactDelete,
    getContactPut,

}