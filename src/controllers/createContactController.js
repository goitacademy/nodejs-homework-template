const contactOperations = require("../models/contacts");
const schema = require("../schemas/validation");

const { addContact } = contactOperations;

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return () => {
      res.status(400).json({
        status: 400,
        message: "missing required name field",
      });
    };
  } else {
    try {
      const value = await schema.validateAsync({ name, email, phone });
      console.log(value);
      const newContacts = await addContact(value);
      console.log(newContacts);
      res.status(201).json({
        status: 201,
        data: {
          newContacts,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error.message);
    }
  }
};

module.exports = createContact;
