const { Contact } = require('../../../models')

const addContact = async (req, res, next) => {
  const { body, user } = req

    await Contact.create({...body, owner: user._id})
      .then(data => res.status(201).json({
        body: data,
        message: 'contact create', 
        code: 201,
        status: 'success'
      }))
      .catch(err => res.status(400).json({ message: err.message, code: 400, status: 'falure' }))
}

module.exports = addContact
