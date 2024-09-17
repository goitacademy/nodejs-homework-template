const { Contact } = require("../../models/contactsModels")
const asyncHandler = require("express-async-handler");

const updateFavorite = asyncHandler(async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;
  
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    {new: true});

    if (!result) {
        console.log('Not found');
    };
    if (!body.favorite) { 
        console.log('missing field favorite');
    };

  res.status(201).json(result);
});

module.exports = updateFavorite;