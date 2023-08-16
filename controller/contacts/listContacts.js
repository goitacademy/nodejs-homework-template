const service = require("../../model/contacts");

const { catchAsync } = require("../../utils/errorHandlers");

const listContacts = catchAsync(async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  let contacts;
  if (favorite === undefined) {
    contacts = await service.getAllContacts({ owner }, { skip, limit });
  } else {
    contacts = await service.getFavoriteContacts(
      { owner, favorite },
      {
        skip,
        limit,
      }
    );
  }

  res.status(200).json({
    msg: "Success",
    contacts,
  });
});

module.exports = listContacts;
