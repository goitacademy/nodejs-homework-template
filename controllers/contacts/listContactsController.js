const { listContacts } = require('../../model/contacts')

const listContactsController = async (req, res) => {
  const { _id } = req.user
  try {
    const { page, limit, favorite } = req.query
    if (page && limit) {
      const normalizedPage = Number(page) > 1 ? Number(page) - 1 : 0
      const normalizedLimit = Number(limit) > 0 ? Number(limit) : 0
      const normalizedFavorite = Boolean(favorite)
      const pagination = {
        page: parseInt(normalizedPage * limit),
        limit: normalizedLimit
      }
      const contacts = await listContacts(_id, pagination, normalizedFavorite)
      return res.status(200).json({ contacts })
    }

    const normalizedPage = 0
    const normalizedLimit = 0
    const normalizedFavorite = Boolean(favorite)
    const pagination = {
      page: normalizedPage,
      limit: normalizedLimit
    }

    const contacts = await listContacts(_id, pagination, normalizedFavorite)
    return res.status(200).json({ contacts })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = listContactsController
