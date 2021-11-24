const contactsOperations = require("../../model");
const createError = require("http-errors");
const contactSchema = require("../../model/contactSchema");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const update = await contactsOperations.updateById(contactId, req.body);
    if (!update) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "succsess",
      code: 200,
      result: update,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
