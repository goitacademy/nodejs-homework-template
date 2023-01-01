const { Contact } = require("../../models");

const { joiSchema } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const newContact = await Contact.create(req.body);
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
