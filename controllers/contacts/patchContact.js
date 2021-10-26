const { updateContact } = require('../../model/contacts')

const patchContact = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ status: 'bad request' })
  }
  const { contactId } = req.params
  try {
    const data = await updateContact(contactId, req.body)
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

module.exports = { patchContact }
