const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    res.status(400).json({
      message: "missing field favorite",
    });
  }

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw RequestError(404);
  }
  res.status(201).json(result);
};

module.exports = updateFavorite;
