const service = require("../../model/contacts");

const { catchAsync } = require("../../utils/errorHandlers");

const addContact = catchAsync(async (req, res, next) => {
  const { _id: owner } = req.user;

  const newContact = await service.createContact({ ...req.body, owner });

  res.status(201).json({
    msg: "Success",
    contact: newContact,
  });
});

module.exports = addContact;
