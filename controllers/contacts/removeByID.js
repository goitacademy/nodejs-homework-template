const contactOperations = require("../../models/");
const createError = require("http-errors");

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactOperations.removeContact(id);

  if (!result) {
    throw createError(404, `contact with id:${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: `contact with id:${id} deleted`,
    data: {
      result,
    },
  });
};

module.exports = removeById;
