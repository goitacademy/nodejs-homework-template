const contacts = require('../model/contacts.json')

const listContact = async(req, res) => {
  await res.json({
    status: 'success',
    code: 200,
    data: { result: contacts },
  })
}

module.exports = listContact
