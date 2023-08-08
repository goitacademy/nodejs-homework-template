const contactSchema = require("../../validation/contacts");

const { addContact } = require("../../models/contacts");

const createNew = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
      return;
    }

    const result = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createNew;