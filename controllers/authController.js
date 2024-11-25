const { addContactRegister } = require("../models/contacts")
const uservalidator = require("../utils/uservalidator")
const jsonwebtoken = require('jsonwebtoken');
const User = require("../models/contactModal");
const signToken = (id) => jsonwebtoken.sign({ id }, "iehasdnaskdjhwqkdnadskjd", {
    expiresIn : '1d'
}  )


const authControllerRegister = async (req, res, next) => {
  
    const { error, value } = uservalidator(req.body)
    if (error) {      
        const err = new Error('validation failed', error.details[0])
        err.status = 404
        return next(err) 
    }
    const {email,subscription, password} = value;
    

    if (!email  || !password) {
      const err = new Error('missing required name field', error.details[0])
      err.status = 400
      return next(err) 
  
    }
    
    const userExist = await User.exists({email});
    
    
    
    if (!userExist) {
      const newContact = await addContactRegister(email,subscription, password);
      const token = signToken(newContact)
      newContact.token = token
      res.status(201).json({
       newContact    //! тут надо вернуть только ПОДПИСКУ И ЕМАЙЛ НАДО ИСПРАВИТЬ 
          })
      return
    }
    
    res.status(409).json({
      message : 'Contacts exist'
    })
 
  }

module.exports = authControllerRegister