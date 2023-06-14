const { Contact } = require("../../models");
const { HttpError, wrapper } = require("../../helpers");

const updateStatusContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndDelete(contactId);

//   if (!result) {
//     throw HttpError(404, "Not found");
//   }

//   res.json({ message: "Contact deleted" });
};

module.exports = wrapper(updateStatusContact);