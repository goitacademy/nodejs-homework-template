const { Contact, joiSchema } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
