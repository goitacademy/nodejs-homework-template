const Contact = require("../models/contact")

async function deleteContact(req, res, next) {
    const { contactId } = req.params;
      const remove = await Contact.findByIdAndDelete(contactId);
      if (!remove) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json({ message: "contact deleted" }); 
}

module.exports = deleteContact