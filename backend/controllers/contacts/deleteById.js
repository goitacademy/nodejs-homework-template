
const { Contact } = require("../../models/contactsModels");
const asyncHandler = require("express-async-handler");

const deleteById = asyncHandler( async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
        console.log("error");
     }


  res.status(200).json({ message: 'contact deleted' });
});

module.exports = deleteById;