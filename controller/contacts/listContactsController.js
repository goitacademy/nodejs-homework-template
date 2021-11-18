const { listContacts } = require('../../model')

async function listContactsController(res) {
  const contacts = await listContacts()
  res.json({
    status: 'Success',
    code: 200,
    data: { result: contacts },
  })
}
module.exports = listContactsController
