const { Contact } = require("../../models/contactsModels");
const asyncHandler = require("express-async-handler");

const updateById = asyncHandler(async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId,
    { ...body },
    {new: true});

  if (!result) {
        console.log("error");
     };

  res.status(201).json(result);
});

module.exports = updateById;