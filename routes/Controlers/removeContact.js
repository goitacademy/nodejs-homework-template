// created by Irina Shushkevych
const { updateDB, getContacts } = require('../../models')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const data = await getContacts()
  const contactIdx = data.findIndex((el) => el.id === contactId)
  if (contactIdx === -1) {
    res.locals.id = contactId
    res.locals.code = 404
    next()
    return
  }
  await updateDB(data.filter((el) => el.id !== contactId))
  res.status(200).json({
    status: 'ok',
    code: 200,
  })
}

module.exports = removeContact
