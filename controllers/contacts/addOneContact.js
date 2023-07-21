const {Contact} = require('../../models/contact')

const addOneContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

module.exports = addOneContact

