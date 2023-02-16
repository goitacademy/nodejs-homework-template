const contactsOperations = require("../../models/contacts");
const contactSchema = require("../../validation/validation");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const error = new Error(`missing fields`);
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
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

module.exports = updateById;
