const { basedir } = global
const { Contact } = require(`${basedir}/models/contacts`)

const getAllContacts = async (req, res) => {
  const { id: owner } = req.user
  const { page = 1, limit = 20, favourite = true } = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find(
    { owner, favourite: favourite },
    '-createdAt -updatedAt',
    {
      skip,
      limit: Number(limit),
    }
  ).populate('owner', 'username email')

  console.log(result)
  res.json(result)
}

module.exports = getAllContacts