const contactsOperations = require("../../models/contacts");
// const createError = require("http-errors");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.getContactById(contactId);
  if (!result) {
    // Попробовал отлавливать ошибки другими способами, но что-то у меня не заработало, в APP и мидлваре тоже менял, закоментирован кусок кода

    // throw createError(404, `Not found ID=${contactId}`);

    // const error = new Error(`Not found ID=${contactId}`);
    // error.status = 404;
    // throw error;

    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found ID=${contactId}`,
    });
  }
  res.json(result);
};

module.exports = getContactById;
