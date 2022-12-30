// const Joi = require("joi");

const { nanoid } = require("nanoid");
const { addContact } = require("../../models/contacts");

const addPost = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contacts = await addContact(newContact);

    res.status(201).json({ data: { contact: contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = addPost;
