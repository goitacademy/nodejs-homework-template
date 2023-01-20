const { Contacts } = require("../../model");
const { NotFound } = require("http-errors");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndRemove(id);
  if (!result) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.status(200), res.json(result);
};

module.exports = deleteById;
