const {Contact} = require('../../models/contacts')
const { HttpError } = require("../../utils")

const getOneContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

module.exports = getOneContactById