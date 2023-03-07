const { addContact, findDuplicateContact } = require("../../services");
const contactValidation = require("../../middlewares/contactsValidation");

const addContactController = async (req, res) => {
  const { error } = contactValidation.validate(req.body);
  const { name, email, phone, favorite = false } = req.body;
  const {id: owner} = req.user;

  const missing = !name || !email || !phone;
  const word = !name ? "name" : !email ? "email" : "phone";

  const errorHandling = (code, message) => {
    return res.status(code).json({ message: message });
  };

  if (missing) {
    return errorHandling(400, `missing ${word} field`);
  }
  if (error) {
    return errorHandling(400, error.details[0].message);
  }

  const contactExists = await findDuplicateContact(name, email, phone, owner);

  if (contactExists) {
    return errorHandling(400, "contact with same data already exists"); 
  }

  const newContact = await addContact({name, email, phone, favorite, owner});

  return res.status(201).json(newContact);
}; 

module.exports = addContactController;