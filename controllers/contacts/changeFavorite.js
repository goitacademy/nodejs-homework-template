const { HTTP404Error } = require("../../helpers/errorHandlers");
const { updateFavorite } = require("../../services/contacts");

const changeFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await updateFavorite(contactId, { favorite });
  if (!result) {
    throw new HTTP404Error(`There is no such contact with id: ${contactId}`);
  }
  return res.json({ data: result, status: "success", code: 200 });
};

module.exports = changeFavorite;
