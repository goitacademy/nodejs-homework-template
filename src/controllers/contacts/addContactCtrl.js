const { addContact } = require("../../services");

const { contactValidator } = require("../../middleware");

const createContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const { error } = contactValidator.validate(req.body);
  const { name, email, phone, favorite = false } = req.body;

  const requiredField = !name || !email || !phone;
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (requiredField) {
    return res.status(400).json({ message: "missing required fields" });
  }

  const newContact = await addContact({ name, email, phone, favorite, owner });

  if (!newContact) {
    return res.status(400).json({ message: "Contact is already exist" });
  }

  return res.status(200).json(newContact);
};

module.exports = createContactController;
