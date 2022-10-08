const { basedir } = global
const { Contact } = require(`${basedir}/models/contacts`)
const { createError } = require(`${basedir}/helpers`)

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId)
  if (!result) throw createError({ status: 404 })
  return res.json(result)
}

module.exports = getContactById