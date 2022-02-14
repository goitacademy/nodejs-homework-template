// created by Irina Shushkevych
const { updateContacts, getContacts } = require('../../models')

const updateContact = async (req, res, next) => {
  const data = await getContacts()
  const { contactId } = req.params
  const { name, email, phone } = req.body
  const idx = data.findIndex((el) => el.id === contactId)
  if (idx === -1) {
    next()
    return
  }
  data[idx].name = name
  data[idx].email = email
  data[idx].phone = phone

  await updateContacts(data)
  res.status(200).json({
    status: 'ok',
    code: 200,
    data: data[idx],
  })
}

module.exports = updateContact
