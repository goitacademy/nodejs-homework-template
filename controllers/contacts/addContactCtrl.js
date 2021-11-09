const Contact = require('../../models/contact')

const addContactCtrl = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'missing required name field' })
    }
    const data = await Contact.create(req.body)
    res.json({
      status: 'success',
      code: 201,
      data: { data },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContactCtrl
