const { HttpError } = require("../../Utilities");
const { Contact } = require("../../models");

const updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateContactStatus;