// created by Irina Shushkevych
const { getId, getContacts, updateDB } = require('../../models/contacts')

const addContact = async (req, res, next) => {
  if (req.res.locals.code) {
    res.locals.code = req.res.locals.code
    res.locals.message = req.res.locals.message
    next()
    return
  }
  const { name, email, phone } = req.body
  const data = await getContacts()
  const id = await getId()
  const contact = { id, name, email, phone }
  await updateDB([...data, contact])
  res.status(201).json({
    status: 'created',
    code: 201,
    data: contact,
  })
}

module.exports = addContact
