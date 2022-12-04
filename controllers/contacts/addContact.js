const {addContact} = require('../../models/contacts')
const {ErrorPages} = require('../../helpers/ErrorPage')

const addContactItem = async (req, res, next) => {
    try {
      const {body} = req.body
      const result = await addContact(body)
      if(!result){
        throw ErrorPages(400, "missing required name field")
      }
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

module.exports = addContactItem