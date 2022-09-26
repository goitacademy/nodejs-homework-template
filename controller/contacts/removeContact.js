const contactOperation = require("../../models/index");
const createError = require("http-errors");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperation.removeContact(contactId);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: `Contact with id ${contactId} was deleted`,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = removeContact;
