const { Contact } = require('../../../models/contactSchema')
const { NotFound } = require('http-errors')

const updateContactController = async (req, res) => {
  const { body, params } = req

 const result = await Contact.findByIdAndUpdate(params.contactId, body, { new: true})

  if(!result) {
    throw new NotFound(`Contact with id=${params.contactId} not found`)
  }
    
  else {
    res.status(200)
      .json({ body: result, message: 'contact update', code: 200, status: 'success' })
  }

}

module.exports = {
  updateContactController
}
