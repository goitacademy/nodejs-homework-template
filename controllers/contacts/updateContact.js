const contactsModel = require('../../models/contact')


const updateContact =async (req, res) => {
    const { contactId } = req.params;
  try {
    const result = await contactsModel.updateContact(contactId, req.body)
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { task: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = {updateContact};