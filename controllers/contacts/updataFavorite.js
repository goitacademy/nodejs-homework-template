const { NotFound } = require("http-errors");
const { sendSuccessResponse } = require("../../utils");
const { Contact } = require("../../models");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!contact) {
    throw new NotFound();
  }

  sendSuccessResponse(res, { contact });
};

module.exports = updateFavorite;
