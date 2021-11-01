const { listContacts } = require('../../model/contacts')

const getAllContacts = async (req, res, next) => {
  try {
    const data = await listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: data
      }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = getAllContacts
