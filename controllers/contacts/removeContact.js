const { Contact } = require("../../models");
const createError = require("http-errors");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404, `Contact with id=${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: `contact deleted`,
    data: {
      result,
    },
  });
};

module.exports = removeContact;
