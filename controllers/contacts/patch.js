const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const patch = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new HttpError(404, "Contacts with such id is not found");
  }
  res.json(result);
};

module.exports = patch;
