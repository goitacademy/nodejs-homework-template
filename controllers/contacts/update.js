const contactOperations = require("../../models/");
const createError = require("http-errors");

const update = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactOperations.updateContact(id, req.body);

  if (!result) {
    throw createError(404, `contact with id:${id} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: `updated contact ${req.body.name} with id:${id}`,
    data: {
      result,
    },
  });
};

module.exports = update;
