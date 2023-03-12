const contactsModel = require('../../models/contact')

const getContact = async (req, res) => {
    const { contactId } = req.params;
    console.log(contactId);
  try {
    const result = await contactsModel.getContactById(contactId);
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
};

module.exports = {getContact};