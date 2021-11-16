const { listContacts } = require('../../model/contacts')

const listContactsController = async (req, res) => {
  const {_id} = req.user
  try {
    const {page, limit, favorite} = req.query
    const normalizedPage = Number(page) > 1 ? Number(page) - 1 : 0;
    const normalizedLimit = Number(limit)
    const normalizedFavorite = Boolean(favorite)
    const pagination = {
      page: parseInt(normalizedPage * limit),
      limit: normalizedLimit
    }
    
    const contacts = await listContacts(_id, pagination, normalizedFavorite)
    res.status(200).json({ contacts })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = listContactsController
