const contacts = require('../../models/contacts')

const {RequestError} = require('../../helpers')

const schemas = require('../../schemas/contacts')

const updateContact = async (req, res, next) => {
    try {
      const {error} = schemas.contactSchema.validate(req.body)
      if(error){
        throw RequestError(400, error.message)
      }
      const {contactId} = req.params
      const result = await contacts.updateContact(contactId, req.body)
      if(!result){
        throw RequestError(404, 'Not found')
      }
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

module.exports = updateContact