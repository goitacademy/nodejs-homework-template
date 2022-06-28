const { Contact } = require('../../../models/contactSchema')

const getList = async (req, res) => {
  const data = await Contact.find({})
  return res.json({ status: 'success', code: 200, contacts: data })
}

module.exports = {
  getList
}
