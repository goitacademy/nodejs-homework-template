const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const findContact = await Contact.findOne({ _id: id, owner: _id });
  if (!findContact) {
    throw new NotFound(`Contact with id=${id} not found`);
  } else res.json(findContact);
};

module.exports = { getById };
