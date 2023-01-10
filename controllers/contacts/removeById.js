const { HttpError } = require("../../models/HttpError");

const { Contacts } = require("../../models");
const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndRemove(id);
  if (!result) {
    return next(new HttpError(400, "Not found"));
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeById;
