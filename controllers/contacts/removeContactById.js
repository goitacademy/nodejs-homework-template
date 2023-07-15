const { removeContact } = require("../../models/contacts");
const { HttpError } = require("../../utils");

const removeContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

module.exports = removeContactById;
