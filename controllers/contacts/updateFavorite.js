const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contact not found`);
  }
  res.status(200).json({
    message: "favorite successfully updated",
    result: result,
  });
};

module.exports = updateFavorite;
