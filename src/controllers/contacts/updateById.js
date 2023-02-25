const { updateContact } = require("../../models/index");
const createError = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  let data;
  try {
    data = await updateContact(contactId, req.body);
    if (!data) {
      throw createError(404, `Product with ID=${contactId} not found`);
    }
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: error.message
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: { data },
  });
};

module.exports = updateById;
