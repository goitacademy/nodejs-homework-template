const asyncHandler = require("express-async-handler");
const { ContactServices } = require("../../services");
const { HttpError } = require("../../helpers");

const getAllContacts = asyncHandler(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const contactsArr = await ContactServices.getAll(owner, page, limit);
  if (!contactsArr) {
    throw HttpError(404, {
      code: 404,
      message: "Unable to fetch contacts",
    });
  }

  let result = contactsArr;
  if (favorite === "true") {
    result = contactsArr.filter((contact) => contact.favorite === true);
  }
  res.json({
    status: 200,
    message: "Success",
    data: result,
    qty: result.length,
  });
});

module.exports = getAllContacts;
