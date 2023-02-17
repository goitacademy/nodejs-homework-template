const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const deletedContact = await Contact.findOneAndRemove({
    _id: id,
    owner: _id,
  });
  if (!deletedContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json(deletedContact);
};

module.exports = { removeById };
