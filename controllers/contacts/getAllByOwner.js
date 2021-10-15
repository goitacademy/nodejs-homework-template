const { Contact } = require('../../models/contact')

const getAllByOwner = async (req, res, next) => {
  const { _id } = req.user
  const result = await Contact.find({ owner: _id }, '_id, name , email , phone , owner')
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = getAllByOwner
