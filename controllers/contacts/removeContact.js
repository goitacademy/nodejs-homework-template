const Contact = require("../../models/contact");

const { HttpError, ctrlWrappers } = require("../../helpers");

const removeContact = async (req, res) => {
 const {contactId} = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
}

module.exports = { removeContact: ctrlWrappers(removeContact)}