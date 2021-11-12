
const { Contact } = require('../../models')

const getAllContactsCtrl = async (req, res) => {
  const data = await Contact.find({ owner: req.user._id }).populate('owner', '_id email')
  res.json({
    status: 'success',
    code: 200,
    data
  })
}

module.exports = getAllContactsCtrl
