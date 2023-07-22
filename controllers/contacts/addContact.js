const { catchAsync } = require("../../utils");
const contactService = require("../../services/contactServices");

/**
 * Create new contact controller
 */
const addContact = catchAsync(async (req, res) => {
  const newContact = await contactService.addContact(req.body);

  res.status(201).json({
    msg: "Contact created!",
    contact: newContact,
  });
});

module.exports = addContact;
