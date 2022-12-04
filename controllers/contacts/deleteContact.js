const {removeContact} = require('../../models/contacts')
const {ErrorPages} = require('../../helpers/ErrorPage')

const deleteContact = async (req, res, next) => {
    try {
      const {contactId} = req.params
      const result = await removeContact(contactId)
      if(!result){
        throw ErrorPages(404, "Not found")
      }
      res.json({"message": "contact deleted"})
    } catch (error) {
      next(error)
    }
  }
  
module.exports = deleteContact