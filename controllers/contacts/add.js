const { Contact } = require("../../models");

const { joiSchema } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { _id } = req.user;

    // create a new contact and ASSIGN an owner with ID to the contact, who created this contact
    const newContact = await Contact.create({ ...req.body, owner: _id });
    
    res.status(201).json({
      status: "success",
      code: 201,
      result: newContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
