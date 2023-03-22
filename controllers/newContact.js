const { Contact } = require("../models/contact");

const newContact = async (req, res) => {
  const { _id: owner } = req.user;
  // * Извлекаем id пользователя в переменную owner
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = newContact;
