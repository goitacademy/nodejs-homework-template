const service = require("../../model/contacts");

const { catchAsync } = require("../../utils/errorHandlers");

const updateContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedContact = await service.updateContact(id, req.body);

  res.status(200).json({
    msg: "Success",
    contact: updatedContact,
  });
});

module.exports = updateContact;
