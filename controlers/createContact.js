const { Contact } = require('../models/contact')

const createContact = async (req, res, next) => {
 
      const result = await Contact.create( req.body )
      res.status(201).json(result);
   
  }

module.exports = createContact;