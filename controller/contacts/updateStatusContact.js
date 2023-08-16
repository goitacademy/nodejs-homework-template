const service = require("../../model/contacts");

const { catchAsync } = require("../../utils/errorHandlers");

const updateStatusContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedContactStatus = await service.updateContact(id, req.body);

  res.status(200).json({
    msg: "Success",
    contact: updatedContactStatus,
  });
});

module.exports = updateStatusContact;
