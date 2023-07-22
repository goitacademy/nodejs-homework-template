const { catchAsync } = require("../../utils");
const contactService = require("../../services/contactServices");
/**
 * Update contact controller
 */
const updateContact = catchAsync(async (req, res) => {
  const updateContact = await contactService.updateContact(
    req.params.id,
    req.body
  );

  res.status(200).json({
    msg: "Contact updated!",
    contact: updateContact,
  });
});

module.exports = updateContact;
