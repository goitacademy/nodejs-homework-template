const { catchAsync } = require("../../utils");

// Delete contact controller
const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  await contactService.deleteContactById(id);
  // get all contacts from db
  // delete contact by id

  res.sendStatus(204);
  // res.status(200).json({
  //   msg: 'Success',
  // });
});

module.exports = deleteContact;