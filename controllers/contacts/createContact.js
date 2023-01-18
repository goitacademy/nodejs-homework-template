const { Contact } = require("../../models/contact");

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  console.log(owner);
  res.status(201).json(result);
  // res.send(result);
};

module.exports = createContact;
