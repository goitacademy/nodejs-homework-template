const { Contacts } = require("../../model");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contacts.findById(id);
  if (!result) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.status(200).json(result);
};

module.exports = getContactById;
