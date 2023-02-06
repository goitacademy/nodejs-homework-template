const Contact = require("../../models/contactsModel");

const addContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const contact = new Contact({
    owner: req.user.id,
    name: name,
    email: email,
    phone: phone,
    favorite,
  });
  try {
    const result = await contact.save();
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (error) {
    res.status(400).json({ status: "failed", message: error.message });
  }
};

module.exports = addContact;
