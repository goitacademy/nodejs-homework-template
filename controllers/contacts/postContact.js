const { Contact } = require('../../models');

const postContact = async (req, res, next) => {
  const { _id } = req.user;
  const newContact = await Contact.create({...req.body, owner:_id})
  res.status(201).json({ status: "success", code: 201, contact: newContact })
}

module.exports = postContact;