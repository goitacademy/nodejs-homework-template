const contacts = require('../models/contacts')
const {HttpError} = require('../helpers')
const ctrlWpapper = require('../helpers/ctrlWrapper')

const getAll = async (req, res) => {   
      const result = await contacts.listContacts()
      res.json(result)
  }

  const getById = async (req, res) => {  
      const {id} = req.params
      const result = await contacts.getContactById(id)
      if(!result) {
        throw HttpError(404, 'Not found') 
      }
      res.json(result)
  }

  const addContact =  async (req, res) => {
     const result = await contacts.addContact(req.body)
     res.status(201).json(result)
  }

  const updateById = async (req, res) => { 
     const {id} = req.params
     const result = await contacts.updateContact(id, req.body)
     if(!result) {
      throw HttpError(404, 'Not found')
     }
     res.json(result)
  }

  const deleteById = async (req, res) => {
     const {id} = req.params
     const result = await contacts.removeContact(id)
     if(!result) {
      throw HttpError(404, 'Not found')
     }
     res.json({
      message: "contact deleted"
     })
  }
  
  module.exports = {
    getAll: ctrlWpapper(getAll),
    getById: ctrlWpapper(getById),
    addContact: ctrlWpapper(addContact),
    updateById: ctrlWpapper(updateById),
    deleteById: ctrlWpapper(deleteById)
  }
