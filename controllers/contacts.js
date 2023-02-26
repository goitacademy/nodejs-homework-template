const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts")

const {HttpError, ctrlWrapper} = require("../helpers")

const getListContacts = async (req, res) => {
    const result = await listContacts()
    res.json(result)
}

const findContactById = async (req, res) => {
      const {contactId} = req.params
      const result = await getContactById(contactId)
      if(!result){
        throw HttpError(404, "Not found")
      }
      res.json(result)
  }

const addNewContact = async (req, res) => {
      const result = await addContact(req.body)
      res.status(201).json(result)
  }

  const deleteContactById = async (req, res) => {
      const {contactId} = req.params
      const result = await removeContact(contactId)
      if(!result){
        throw HttpError(404, "Not found")
      }
      res.json({message: "contact deleted"})
  }

  const updateContactById =  async (req, res) => {
      const {contactId} = req.params
      const result = await updateContact(contactId, req.body)
      if(!result){
        throw HttpError(404, "Not found")
      }
      res.json(result)
  }

module.exports = {
    getListContacts: ctrlWrapper(getListContacts),
    findContactById: ctrlWrapper(findContactById),
    addNewContact: ctrlWrapper(addNewContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
}