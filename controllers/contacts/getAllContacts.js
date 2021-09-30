const contactsOperations = require('../../model')
// const { contactSchema } = require('../../schemas')

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'sucess',
      code: 200,
      data: {
        result: contacts,
      },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = getAllContacts
