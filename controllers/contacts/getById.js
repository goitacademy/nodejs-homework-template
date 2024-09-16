const contactsOperations = require("../../models/contacts");
const createError = require("http-errors");

const getByid = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperations.getContactById(id);
  if (!result) {
    throw createError(404, `Product with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getByid;
