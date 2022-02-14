// created by Irina Shushkevych
const { updateContacts, getContacts } = require('../../models')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const data = await getContacts()
  const contactIdx = data.findIndex((el) => el.id === contactId)
  if (contactIdx === -1) {
    next()
    return
  }
  await updateContacts(data.filter((el) => el.id !== contactId))
  res.status(200).json({
    status: 'ok',
    code: 200,
  })
}

module.exports = removeContact
