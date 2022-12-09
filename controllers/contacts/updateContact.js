const {updateContact} = require('../../models/contacts')
const {ErrorPages} = require('../../helpers/ErrorPage')

const changeContact = async (req, res, next) => {
    try {
      const {contactId} = req.params
      const {body} = req.body
      const result = await updateContact(contactId, body)
      if(!result){
        throw ErrorPages(404, "Not found")
      }
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

module.exports = changeContact