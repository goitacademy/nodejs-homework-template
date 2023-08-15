const service = require("../../model/contacts");

const { AppError, catchAsync } = require("../../utils/errorHandlers");

const getContactById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const contact = await service.getContactById(id);

  if (!contact) throw new AppError(404, "Not found");

  res.status(200).json({
    msg: "Success",
    contact,
  });
});

module.exports = getContactById;
