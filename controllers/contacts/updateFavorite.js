const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const updaateFavorite = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  )
  if (!result) {
    throw new NotFound('Not found')
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = updaateFavorite
