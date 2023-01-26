const contacts = require('../../modules/contacts');
const {requestError} = require('../../helpers/RequestError')

const updateByID = async (request, response) => {
  const {error} = addSchema.validate(request.body)
  if (error) {
    throw requestError(400, 'Missing fields')
  }
  const {id} = request.params
  const result = await contacts.updateByID(id, request.body)
  if (!result) {
    throw requestError(404, 'Not found')
  }
  response.status(200).json(result)
};

module.exports = updateByID
