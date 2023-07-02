const { Contact } = require("../../models/contactsModels")
const asyncHandler = require("express-async-handler");

const updateFavorite = asyncHandler(async (req, res, next) => {
  const contactBody = req.body;
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, contactBody, {
    new: true,
  });

    if (!result) {
        console.log('Not found');
    };
    if (!contactBody.favorite) { 
        console.log('missing field favorite');
    };

  res.status(201).json(result);
});

module.exports = updateFavorite;