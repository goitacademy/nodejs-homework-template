const asyncHandler = require("express-async-handler");
const contactsModel = require("../../models/contactsModel");
const HttpError = require("../../utils/errors/HttpError");

const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = req.params.id;
  if (!contact) {
    throw new HttpError(404, res.message);
  } else {
    const updatedContact = await contactsModel.findByIdAndUpdate(
      req.params.id,
      req.params.favorite
    );
    if (!updatedContact) {
      console.error(400, res.message);
      throw new HttpError(500, res.message);
    }

    res.status(200).json({ code: 200, data: updatedContact });
  }
  // res.send("updateStatus");
});

module.exports = updateContactStatus;
