const contactOperations = require("../../models/");
const createError = require("http-errors");

const getByID = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactOperations.getById(id);

  if (!result) {
    throw createError(404, `contact with id:${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getByID;
