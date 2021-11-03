const { getContactById } = require('../../model/contacts')

const getContactByIdCtrl = async (req, res, next) => {
  // eslint-disable-next-line no-empty
  const { contactId } = req.params

  try {
    const data = await getContactById(contactId)
    if (!data) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.json({
      status: 'success',
      code: 200,
      data: { data },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getContactByIdCtrl
