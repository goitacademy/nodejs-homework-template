const { removeContact } = require("../../models/contacts.js");
const createError = require("http-errors");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = removeContact(contactId);
    if (!result) {
      throw createError(404, `Product with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "Success",
      code: 200,
      message: `Contact id=${contactId} deleted`,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
