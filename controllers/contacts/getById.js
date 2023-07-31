const Contact = require("../../models/contact");
const HttpError = require("../../helpers/HttpError");


const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};
module.exports = getById;