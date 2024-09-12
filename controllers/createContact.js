// const User = require("../models/contactModal");
const User = require("../models/contactModal");
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
      const err = new Error("missing required name field")
      err.status = 40
      return next(err)
    
    }
    
    const userExist = await User.exists({email}) //! changed here
    
    
    if (!userExist) {
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