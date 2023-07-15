const { getContactById } = require("../../models/contacts");
const { HttpError } = require("../../utils");

const getOneContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getOneContactById;
