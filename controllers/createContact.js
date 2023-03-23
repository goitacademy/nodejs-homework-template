// const User = require("../models/contactModal");
const bcrypt = require('bcrypt');
const { addContact } = require("../models/contacts");
const uservalidator = require("../utils/uservalidator");
const createContact = async (req, res, next) => {
  
  
    
    const { error, value } = uservalidator(req.body)
    if (error) {
        const err = new Error('validation failed', error.details[0])
        err.status = 404
        return next(err)
        
    }
    
    const {email,subscription,token, password} = value;
    
    
    
    
    

    if (!subscription || !email || !token || !password) {
      res.status(400).json({
        message : "missing required name field"  
      })    
      return
    }
    
    // const userExist = await User.exists({email}) //! вернуть проверку
    const userExist = true
    
    
    if (userExist) {
      const newContact = await addContact(email,subscription,token, password)
      res.status(201).json({
       newContact
      })
      return
    }
    res.status(409).json({
      message : 'Contacts exist'
    })
 
  }

module.exports = createContact