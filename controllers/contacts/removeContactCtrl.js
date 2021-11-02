const { removeContact } = require('../../model/contacts')

const removeContactCtrl = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const data = await removeContact(contactId)
    if (!data) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json({
      status: 'success',
      code: 200,
      data: { message: 'contact deleted' }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = removeContactCtrl
