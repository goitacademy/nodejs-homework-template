const {Contact} = require("../models/contact")

const {HttpError, ctrlWrapper} = require("../helpers")

const getListContacts = async (req, res) => {
    const result = await Contact.find({}, "-createAt, -updateAt")
    res.json(result)
}

const findContactById = async (req, res) => {
      const {contactId} = req.params
      const result = await Contact.findById(contactId)
      if(!result){
        throw HttpError(404, "Not found")
      }
      res.json(result)
  }

const addNewContact = async (req, res) => {
      const result = await Contact.create(req.body)
      res.status(201).json(result)
  }

  const deleteContactById = async (req, res) => {
      const {contactId} = req.params
      const result = await Contact.findByIdAndRemove(contactId)
      if(!result){
        throw HttpError(404, "Not found")
      }
      res.json({message: "contact deleted"})
  }

  const updateContactById =  async (req, res) => {
      const {contactId} = req.params
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
      if(!result){
        throw HttpError(404, "Not found")
      }
      res.json(result)
  }

  const updateStatusContact = async (req, res) => {
      const {contactId} = req.params
      const {favorite} = req.body
      const result = await Contact.findByIdAndUpdate(contactId, favorite, {new: true})
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
    updateStatusContact: ctrlWrapper(updateStatusContact),
}