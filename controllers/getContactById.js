const contacts = require("../service");
const { HttpError } = require("../helper");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const response = await contacts.getContactById(contactId);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(response);
};

module.exports = getContactById;
