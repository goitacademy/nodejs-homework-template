const contactOperations = require("../../models/contacts");
const createError = require("http-errors");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactOperations.updateContactById(id);

  if (!result) throw createError(404, "Not found");

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = { updateById };
