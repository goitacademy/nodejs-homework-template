const { Contact } = require("../../models/contact");

const addContact = async (req, res) => {
  //Забираємо через деструктиризацію з об'єкту запиту (req) "_id" та відразу переіменовуємо його в "owner"
  const { _id: owner } = req.user;

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = addContact;
