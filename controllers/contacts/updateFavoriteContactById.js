const { Contact } = require("../../models");
const { RequestError } = require("../../helpers");

const updateFavoriteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateFavoriteContactById;
