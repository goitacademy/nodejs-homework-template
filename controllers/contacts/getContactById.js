const {getContactById} = require('../../models/contacts')
const {ErrorPages} = require('../../helpers/ErrorPage')

const getContactId = async (req, res, next) => {
    try {
      const {contactId} = req.params
      const result = await getContactById(contactId)
      if(!result){
        throw ErrorPages(404, "Not found")
      }
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

module.exports = getContactId