const { getContactById } = require("../../models/contacts");

const getContactId = async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = getContactId;
