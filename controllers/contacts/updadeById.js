const { Contacts } = require("../../model");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.status(200).json(result);
};

module.exports = updateById;
