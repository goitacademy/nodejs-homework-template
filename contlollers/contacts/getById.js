const contactOperations = require("../../models/contacts");
const createError = require("http-errors");
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactOperations.getContactById(contactId);
    if (!contact) {
      throw createError(
        404,
        `Contact with contactId - ${contactId} is not found`
      );
      // const error = new Error(
      //   `Contact with contactId - ${contactId} is not found`
      // );
      // error.status = 404;
      // throw error;
      // res.json({
      //   status: "error",
      //   code: 404,
      //   message: `Contact with contactId=${contactId} is not found`,
      // });
    }
    res.json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
