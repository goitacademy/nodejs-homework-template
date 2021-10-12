const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const getFavoriteContacts = async (req, res, next) => {
  const favorite = await Contact.find({ favorite: true })
  console.log('favorite :>> ', favorite)
  if (!favorite) {
    throw new NotFound('Not favorite contacts')
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: favorite
  })
}

module.exports = getFavoriteContacts
