const { listContacts, addContact, getContactById, removeContact, updateContact } = require("../models/contacts")

const {ctrlWrapper} = require('../Utils/ctrlWrapper')

const { HttpError } = require("../Utils/httpError")


const getAll = async (req, res) => {
  
     const result = await listContacts()
    res.json(result)
  
 }

 const add = async (req, res) => {
  const result = await addContact(req.body)
    res.status(201).json(result)
 
  }

  const getById = async (req, res) => {

      const { contactId } = req.params;
      const result = await getContactById(contactId)
      if (!result) {
        throw HttpError(404, 'Not found');
      }
    res.json(result);
   
  }

  const deleteById = async (req, res) => {
      const { contactId } = req.params;
      const result = await removeContact(contactId)
      res.json(result)
   
    
    }
    const update =  async (req, res) => {
        const { contactId } = req.params;
      const result = await updateContact(contactId, req.body)
      if (!result) {
        throw HttpError(404, 'Not found');
      }
        res.json(result)
     
      }
 
 module.exports = {
    getAll: ctrlWrapper(getAll),
    add: ctrlWrapper(add),
    getById: ctrlWrapper(getById),
    deleteById: ctrlWrapper(deleteById),
    update: ctrlWrapper(update)
 }