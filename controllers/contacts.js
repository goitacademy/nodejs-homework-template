const {ctrlWrapper} = require('../Utils/ctrlWrapper')
const { HttpError } = require("../Utils/httpError")

const Contact = require('../models/contact')


const getAll = async (req, res) => {
     const result = await Contact.find()
     res.json(result)
 }

 const add = async (req, res) => {
  const result = await Contact.create(req.body)
    res.status(201).json(result)
 
  }

  const getById = async (req, res) => {
      const { contactId } = req.params;
    // const result = await Contact.findOne({ _id: contactId })
    const result = await Contact.findById(contactId)
    
      if (!result) {
        throw HttpError(404, 'Not found');
      }
    res.json(result);
   
  }

  const deleteById = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndRemove(contactId)
      res.json(result)
   
    
    }

    const update =  async (req, res) => {
        const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
      if (!result) {
        throw HttpError(404, 'Not found');
      }
        res.json(result)
     
}
        const updateFavorite =  async (req, res) => {
        const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
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
   update: ctrlWrapper(update),
    updateFavorite: ctrlWrapper(updateFavorite)
 }