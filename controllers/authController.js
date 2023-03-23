const { addContactRegister } = require("../models/contacts")
const uservalidator = require("../utils/uservalidator")
const jsonwebtoken = require('jsonwebtoken');

// const User = require("../models/contactModal");

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

    if (!subscription || !email  || !password) {
      res.status(400).json({
        message : "missing required name field"  
      })    
      return
    }
    
    // const userExist = await User.exists({email}) //! вернуть проверку
    const userExist = true  //* 
    
    
    if (userExist) {
      const newContact = await addContactRegister(email,subscription, password);
      const token = signToken(newContact.id)
      res.status(201).json({
       newContact,
       token 
          })
      return
    }
    res.status(409).json({
      message : 'Contacts exist'
    })
 
  }

module.exports = authControllerRegister