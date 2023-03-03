const contactOperations = require("../../models/contacts");
const createError = require("http-errors");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = contactOperations.getContactById(id);

  if (!result) throw createError(404, "Not found");

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = { getById };
