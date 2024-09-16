const { Contact } = require("../../models");

const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;

  // as a default method findByIdAndUpdate returns an old version of object. If we need a new one as a 3rd argument should be object {new: true,}
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateStatusContact;
