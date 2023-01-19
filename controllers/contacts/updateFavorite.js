const { Contacts } = require("../../model");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contacts.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contact with id:${id} not found`);
  }
  return res.status(200).json(result);
};

module.exports = updateFavorite;
