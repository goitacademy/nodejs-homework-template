const { Contact } = require("../../models");

const { HttpError } = require("../../helpers");

const updateContactByFavorite = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

  const { favorite } = req.body;

  if (!favorite) {
    throw HttpError(400, "Missing field favorite");
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Contact updated",
    data: { contact },
  });
};

module.exports = updateContactByFavorite;
