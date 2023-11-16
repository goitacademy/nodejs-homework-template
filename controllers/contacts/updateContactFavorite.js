const { catchAsync } = require("../../utils");
const contactService = require("../../services/contactServices");
/**
 * Update Favorite controller
 */
const updateContactFavorite = catchAsync(async (req, res) => {
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updateContact = await contactService.updateContactFavorite(
    req.params.id,
    favorite
  );
  console.log(updateContact);

  res.status(200).json({
    msg: "Contact updated!",
    contact: updateContact,
  });
});

module.exports = updateContactFavorite;
