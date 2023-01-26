const contacts = require('../../modules/contacts');
const {requestError} = require('../../helpers')

const getContactByID = async (request, response) => {
  const {id} = request.params
  const result = await contacts.getContactById(id)
  if (!result) {
    throw requestError(404, 'Not found')
  }
  response.json(result)
};

module.exports = getContactByID
