const { Contact } = require('../../../models/contactSchema')

const addContactController = async (req, res, next) => {
  const { body } = req

    await Contact.create(body)
      .then(data => res.status(201).json({ body: data, code: 201, status: 'success' }))
      .catch(err => res.status(400).json({ message: err.message, code: 400, status: 'falure' }))
}

module.exports = {
  addContactController
}
