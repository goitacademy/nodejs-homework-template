const { addContact } = require("../../services");
const contactValidator = require("../../middleware/validator");

const addContactCtrl = async (req, res) => {
  let { error } = contactValidator.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (!req.body.favorite) {
    req.body.favorite = false;
  }

  const newContact = await addContact(req.body);

  return !newContact
    ? res.status(400).json({ message: "Contact is already exist" })
    : res.status(200).json(newContact);
};

module.exports = addContactCtrl;
