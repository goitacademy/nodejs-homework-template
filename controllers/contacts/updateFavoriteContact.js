const { Contact } = require("../../models");
const { RequestError } = require("../../services");

const updateFavoriteContact = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!data) {
    throw RequestError(404, `Not found`);
  }

  res.status(200).json(data);
};

module.exports = updateFavoriteContact;
