
const { HttpError, wrapper } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await (contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "Contact deleted" });
};

module.exports = wrapper(removeById);
