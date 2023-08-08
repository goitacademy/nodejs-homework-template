const contactSchema = require("../../validation/contacts");
const { updateContact } = require("../../models/contacts");

const editById = async (req, res, next) => {
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

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      res.json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = editById;