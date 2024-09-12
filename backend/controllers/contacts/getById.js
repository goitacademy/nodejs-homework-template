const { Contact } = require("../../models/contactsModels");
const asyncHandler = require("express-async-handler");

const getById = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

    if (!result) {
        console.log("error");
     };

  res.status(200).json(result);
});

module.exports = getById;