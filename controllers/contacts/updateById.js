const { HttpError, wrapper } = require("../../helpers");

const updateById = async (req, res) => {

  const { contactId } = req.params;
  const result = await (contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = wrapper(updateById);
