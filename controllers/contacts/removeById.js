const contactOperations = require("../../models/contacts");
const createError = require("http-errors");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = contactOperations.removeContact(id);

  if (!result) throw createError(404, "Not found");

  res.json({
    status: "succuess",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = { removeById };
