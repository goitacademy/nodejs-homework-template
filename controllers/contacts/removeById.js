const { Contact } = require("../../models");

const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = Contact.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(`Contacts with id=${id} not found`);
  }

  res.sendStatus(204);
};

module.exports = removeById;
