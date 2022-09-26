const contactOperation = require("../../models/index");
const { contactSchema } = require("../../schema/index");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await contactOperation.addContact(req.body);

    res.status(201).json({
      status: "create",
      code: 201,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
