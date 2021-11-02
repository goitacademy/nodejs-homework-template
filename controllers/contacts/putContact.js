const { replaceContact } = require('../../model/contacts')

const putContact = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const data = await replaceContact(contactId, req.body)
    if (!data) {
      return res.status(404).json({ status: 'failure, no contact found' })
    }
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

module.exports = { putContact }
