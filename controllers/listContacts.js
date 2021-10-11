const { Contact } = require('../model')

const listContacts = async (req, res, next) => {
  try {
    const results = await Contact.find({})

    res.json({
      status: 'success',
      code: 200,
      data: { results },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
