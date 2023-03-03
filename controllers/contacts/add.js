const Contact = require("../../models/contact");

async function add(req, res, next) {
  const { _id: owner } = req.user;

  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json(contact);
}

module.exports = add;
