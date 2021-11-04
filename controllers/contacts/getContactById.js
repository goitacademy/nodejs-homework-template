const { NotFound } = require('http-errors')
const { getById } = require('../../models/contacts')

const getContactById = async (req, res, next) => {
  const idNormalize = Number(req.params.contactId)
  const contact = await getById(idNormalize)
  if (!contact) {
    throw new NotFound(`Contact with id ${idNormalize} not found`)
  }
  res.json({
    status: 'sucsess',
    code: 200,
    data: { contact }
  })
}

module.exports = getContactById
