const { addContact } = require("../models/contacts");
const uservalidator = require("../utils/uservalidator");
const createContact = async (req, res, next) => {
    
    const { error, value } = uservalidator(req.body)
    if (error) {
        const err = new Error('validation failed', error.details[0])
        err.status = 404
        return next(err)
        
    }
    const {name,email,phone} = value;
    if (!name || !email || !phone) {
      res.status(400).json({
        message : "missing required name field"  
      })    
      return
    }
    
     await addContact   (name,email,phone)
     res.status(201).json({
       name,
       email,
       phone,
     })
  }

module.exports = createContact