// created by Irina Shushkevych
const { getId, getContacts, updateContacts } = require('../../models')

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  const data = await getContacts()
  const id = await getId()
  const contact = { id, name, email, phone }
  await updateContacts([...data, contact])
  res.status(201).json({
    status: 'ok',
    code: 201,
    data: contact,
  })
}

module.exports = addContact
