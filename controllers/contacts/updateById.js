const { HttpError } = require("../../models/HttpError");

const { Contacts } = require("../../models");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    return next(new HttpError(400, "Not found"));
  }
  return res.status(200).json(result);
};

module.exports = updateById;
