const contacts = require('../../models/contacts')
const {RequestError} = require('../../helpers/RequestError')

const delById = async (req, res, next) => {
 try {
   const { contactId } = req.params;
   const result = await contacts.updateContact(contactId)
   
    if (!result) {
      throw RequestError('Not found', 404)
    }
    res.json({message: "contact deleted"})
  }
  catch (error) {
    next(error)
  }
}

module.exports = delById
