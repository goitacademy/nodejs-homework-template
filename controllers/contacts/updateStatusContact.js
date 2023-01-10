const { Contacts } = require("../../models");
const { HttpError } = require("../../models/HttpError");

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contacts.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    return next(new HttpError(400, "Not found"));
  }
  return res.status(200).json(result);
};

module.exports = updateStatusContact;
