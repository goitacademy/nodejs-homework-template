const { HttpError } = require("../../utilities");
const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = getById;
