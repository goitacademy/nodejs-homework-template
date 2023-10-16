const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getAll = async (req, res) => {
  const data = await Contact.find();
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data });
};

module.exports = ctrlWrapper(getAll);
