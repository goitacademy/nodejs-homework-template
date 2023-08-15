const service = require("../../model/contacts");

const { AppError, catchAsync } = require("../../utils/errorHandlers");

const removeContact = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await service.removeContact(id);

  if (!result) {
    throw new AppError(404, "Not found");
  }
  res.status(200).json({
    msg: "contact deleted",
  });
});

module.exports = removeContact;
