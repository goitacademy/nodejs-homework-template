const { Contact} = require('../models/schema')
const createError = require('http-errors')

const listContacts = async (req, res) => {
   const result = await Contact.find({})
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
    const contactById = await Contact.findById(contactId)
    if (!contactById) {
      throw createError(404, `Contact with id: ${contactId} not found `)
   
     }
    res.json({
      status: "success",
      code: 200, 
      data: {
        result: contactById
      }
    })
}

const removeContact = async (req, res) => {
 const { contactId } = req.params;
   const result = await Contact.findByIdAndRemove(contactId)
   if (!result) { throw createError(404, `Contact with id: ${contactId} not found `) }
   res.json({
     status: "success",
     code: 200, 
       message: "contact deleted",
      data: {
        result
      }
   })
}

const addContact = async (req, res) => {
  
    const result = await Contact.create(req.body)
     
    res.status(201).json({
      status: "success",
      code: 201, 
      data: {
        result
      }
    })
}

const updateContact = async (req, res) => { 
  const { contactId } = req.params;
   
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true})
    if (!result) {
      throw createError(404, `Contact with id: ${contactId} not found `)
   
     }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
}

const updateFavoriteContact = async (req, res) => { 
    const { contactId } = req.params;
     const {  favorite } = req.body;
  
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new:true})
    if (!result) {
      throw createError(404, `Contact with id: ${contactId} not found `)
   
     }
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
    updateContact,
  updateFavoriteContact,
}