const schemaContacts = require('../../models/schemaContacts')
const {ErrorPages} = require('../../helpers/ErrorPage')

const getContactId = async (req, res, next) => {
    try {
      const {contactId} = req.params
      const result = await schemaContacts.findOne({_id: contactId})
      if(!result){
        throw ErrorPages(404, "Not found")
      }
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

module.exports = getContactId