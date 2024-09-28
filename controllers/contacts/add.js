const Contacts = require("../../models/contact");


const add = async (req, res) => {
  const { name, email, phone } = req.body;
  const { _id: owner } = req.user;
  const result = await Contacts.create({ name, email, phone, owner });
  res.status(201).json(result);
};

module.exports = add;
