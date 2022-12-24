const { Contact } = require("../../models");

const updateContactByFavorite = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }

  if (!req.body.favorite) {
    const error = new Error(`Missing field favorite`);
    error.status = 400;
    throw error;
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Contact updated",
    data: { contact },
  });
};

module.exports = updateContactByFavorite;
