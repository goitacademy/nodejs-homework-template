const { Contact } = require('../../models')

const favorite = async (req, res, _) => {
  const query = req.query.favorite
  const contacts = await Contact.find({ owner: req.user._id })
  const contactsFavorite = await contacts.filter(
    ({ favorite }) => query === `${favorite}`,
  )
  res.json({
    status: 'success',
    code: 200,
    data: {
      contactsFavorite,
    },
  })
}

module.exports = favorite
