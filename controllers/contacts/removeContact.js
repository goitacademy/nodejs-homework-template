const { catchAsync } = require("../../utils");
const contactService = require("../../services/contactServices");
/**
 * Delete contact controller
 */
const removeContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await contactService.removeContact(id);

  res.sendStatus(204);
});

module.exports = removeContact;
