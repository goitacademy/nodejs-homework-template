const listContacts = require('../../model/contacts/listContacts')

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: 200,
      data: {
        contacts,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getContacts
