// created by Irina Shushkevych
const { updateDB, getContacts } = require('../../models')

const updateAllContact = async (req, res, next) => {
  if (req.res.locals.code) {
    res.locals.code = req.res.locals.code
    res.locals.message = req.res.locals.message
    next()
    return
  }
  const data = await getContacts()
  const { contactId } = req.params
  const { name, email, phone } = req.body
  const idx = data.findIndex((el) => el.id === contactId)
  if (idx === -1) {
    res.locals.id = contactId
    res.locals.code = 404
    next()
    return
  }
  data[idx].name = name
  data[idx].email = email
  data[idx].phone = phone

  await updateDB(data)
  res.status(200).json({
    status: 'ok',
    code: 200,
    data: data[idx],
  })
}

module.exports = updateAllContact
