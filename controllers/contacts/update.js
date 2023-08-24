const asyncHandler = require("express-async-handler");
const contactsModel = require("../../models/contactsModel");
const HttpError = require("../../utils/errors/HttpError");

const update = asyncHandler(async (req, res) => {
  const contact = req.params.id;
  if (!contact) {
    throw new HttpError(400, res.message);
  }
  
 const updatedContact = await contactsModel.findByIdAndUpdate(
    req.params.id,
    req.params,
    { new: true, strict: "throw", runValidators: true }
  );
  if (!updatedContact) {
    console.error("Error updating contact:", res.message);
    throw new HttpError(500, res.message);
  }

  res.status(200).json({ code: 200, data: updatedContact });

  // res.send("update");
});

module.exports = update;
