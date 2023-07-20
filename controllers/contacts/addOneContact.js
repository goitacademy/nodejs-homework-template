const {Contact} = require('../../models/contacts')

const addOneContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

module.exports = addOneContact