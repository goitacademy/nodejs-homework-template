const { updateContact } = require("../../models/index");
const createError = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const data = await updateContact(contactId, req.body);
  if (!data) {
    throw createError(404, `Product with ID=${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: { data },
  });
};

module.exports = updateById;