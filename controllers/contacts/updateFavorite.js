const { Contact } = require("../../models/contacts");
const { HttpError } = require("../../utils");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
};
module.exports = updateFavorite;
