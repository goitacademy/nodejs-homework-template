const Contact = require('../../models/contacts'); 
const { createContactSchema } = require('../../validation/validation');

const addContact = async (req, res) => {
  const { error } = createContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: { "message": "missing required name field" } });
  }

  try {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    const savedContact = await newContact.save();

    res.status(201).json({ data: savedContact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = addContact;
