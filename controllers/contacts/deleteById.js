const { Contact } = require("../../models/index.js");

const { HttpError } = require("../../helpers/index");

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndDelete({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    message: "Delete success",
  });
};

module.exports = deleteById;
