const contacts = require('../../model/contacts.json')

const listContacts = async (req, res) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    })
  } catch (error) {
    throw error
  }
}

module.exports = listContacts
