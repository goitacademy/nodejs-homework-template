const createError = require("http-errors");
const contactsOperations = require("../../contactsOperations");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw createError(404, `Contact with id=${id} not found`);
    }
    res.json({
      message: `contact with id=${id} deleted`,
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
module.exports = removeContact;
