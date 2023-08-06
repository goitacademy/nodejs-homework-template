const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const ubdateFavourite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (result === null) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = ubdateFavourite;
