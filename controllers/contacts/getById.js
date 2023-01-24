const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.asyncHandler(
    contactsOperations.getById,
    id
  );
  if (!result) {
    throw createError(404, `Contact with id=${id} not found`);
    // const error = new Error(`Contact with id=${id} not found`);
    // error.status = 404;
    // throw error;
  }
  res.json({
    status: "success",
    code: 200,
    message: `contact with id=${id} fetched`,
    data: { result },
  });
};

module.exports = getById;
