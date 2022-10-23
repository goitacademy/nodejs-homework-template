const {Contact, schemas} = require('../../models/contacts');

const createError = require('../../middleware/createError');


const addContact = async (req, res) => {

    const { error } = schemas.add.validate(req.body)
    if (error) {
      throw createError(400, error.message)
    }
    const reply = await Contact.create(req.body)
    res.status(201).json(reply)
  }
  
  module.exports =addContact;

