const {Contact} = require('../../models/contact')
const { HttpError } = require("../../utils")

const getOneContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Contact.findById(id,req.body, {owner});

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

module.exports = getOneContactById