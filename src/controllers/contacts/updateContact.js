const { Contact } = require('../../../models')

const updateContact = async (req, res) => {
  const { body, params } = req

  await Contact.findByIdAndUpdate(params.contactId, body, { new: true})
    .then(data => {
      if(!data) { res.status(404).json({ message: 'Not found', status: 'failure' }) }

      else {
        return res.status(200).json({
          body: data,
          message: 'contact update', 
          code: 200,
          status: 'success'
        })
    }
    })
    .catch(err => res.status(400).json({ message: err.message, code: 400, status: 'falure' }))}

module.exports = updateContact
