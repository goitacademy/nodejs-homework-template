const Contact = require("../../models/contact.js");
const { HttpError } = require("../../helpers");

const addContact = async (req, res, next) => {
  const { id } = req.user;
  const { name } = req.body;
  try {
    const existingContact = await Contact.findOne({ name });

    if (existingContact) {
      throw new HttpError(400, "Contact already exists");
    }

    const contact = await Contact.create({ ...req.body, owner: id });
    console.log(`Contact with name: ${name} added to the database`.success);
    res.status(201).json({
      message: "contact was added to database",
      contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
