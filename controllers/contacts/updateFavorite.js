const {Contact} = require("../../models");
const { NotFound } = require("http-errors");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const {favorite} = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "missing field favorite",
    data: {
      result,
    },
  });
};
module.exports = updateFavorite;

