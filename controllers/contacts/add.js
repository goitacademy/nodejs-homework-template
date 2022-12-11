const Contact = require("../../models/Contacts");

async function add(req, res) {
  const { name, email, phone, favorite } = req.body;
  const { _id } = req.user;

  const result = await Contact.create({
    name,
    email,
    phone,
    favorite,
    owner: _id,
  });

  res.status(201).json(result);
}

module.exports = add;
