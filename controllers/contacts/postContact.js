const { Contact } = require('../../models');

const postContact = async (req, res, next) => {
  const newContact = await Contact.create(req.body)
  res.status(201).json({ status: "success", code: 201, contact: newContact })
}

module.exports = postContact;