// @ POST /api/contacts

const contacts = require("../../models/contacts");

const { contactSchema } = require("../../schemas/contacts");

const { createError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw createError(400, "Missing required name field");
    }

    const result = await contacts.addContact(req.body);
    return res.json({
      status: "Success",
      code: 201,
      message: "Request successful. Contact created",
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
