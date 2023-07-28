const Contacts = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
  const id = req.params.id;
  const result = await Contacts.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
