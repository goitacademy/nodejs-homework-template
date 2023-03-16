const { addContact } = require("../models/contacts");
const { schema } = require("../schema/joiSchema");


const createContact = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ message: "Missing required name field" });
    }
    const { name, email, phone, favorite } = req.body;
    if (favorite === null) {
      favorite = 'false'
    }

    // const contact = req.body;
    const { _id } = req.user;
    const newContact = await addContact({ name, email, phone, favorite }, _id);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

module.exports = {
  createContact,
};
