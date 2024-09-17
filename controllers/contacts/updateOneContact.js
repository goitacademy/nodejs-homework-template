const {Contact} = require('../../models/contact')
const { HttpError } = require("../../utils")

const updateOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true}, {owner});

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
}


module.exports = updateOneContact
