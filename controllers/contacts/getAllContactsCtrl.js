
const Contact = require('../../models/contact')

const getAllContactsCtrl = async (req, res, next) => {
  try {
    const data = await Contact.find()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: data,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllContactsCtrl
