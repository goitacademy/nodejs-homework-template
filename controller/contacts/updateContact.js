const contactOperation = require("../../models/index");
const { contactSchema } = require("../../schema/index");
const createError = require("http-errors");

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await contactOperation.updateContact(contactId, req.body);
    if (!result) {
      throw createError(400, "Not found");
    }
    res.json({
      status: "successes",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
