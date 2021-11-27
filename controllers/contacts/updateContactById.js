const { NotFound } = require('http-errors')

const contactsOperations = require('../../model/contacts')

const updateContactById = async (req, res) => {
  const { id } = req.params
  const result = await contactsOperations.updateContactById(id, req.body)
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found!`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = updateContactById
