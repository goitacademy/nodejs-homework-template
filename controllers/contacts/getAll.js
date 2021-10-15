const { Contact } = require('../../models/contact')

const getAll = async (req, res, next) => {
  const result = await Contact.find({}, '_id, name , email , phone , owner')
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = getAll
