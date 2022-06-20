const createError = require("http-errors");
const contactsOperations = require("../../contactsOperations");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getById(id);
    if (!result) {
      throw createError(404, `Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
