const {basedir} = global
const Contacts = require(`${basedir}/models/contacts`)

const getAll = async (req, res) => {
      const {id: owner} = req.user
      const {page = 1, limit = 20} = req.query
      const skip = (page - 1) * limit
      const contacts = await Contacts.find({owner}, '', {skip, limit: Number(limit)}).populate("owner", "email")
      res.json({ status: 'success', code: 200, data: {contacts}})
}

  module.exports = getAll