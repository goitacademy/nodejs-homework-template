const contacts = require('../../modules/contacts');
const {requestError} = require('../../helpers/RequestError')

const removeContact = async (request, response) => {
  const {id} = request.params
  const result = await contacts.removeContact(id)
  if (!result) {
    throw requestError(404, 'Not found')
  }
  response.status(200).json({
    message: 'Contact deleted',
  })
};

module.exports = removeContact
