 const {removeContact} = require("../models/contacts")

async function deleteContact(req, res, next) {
    const { contactId } = req.params;
      const remove = await removeContact(contactId);
      if (!remove) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json({ message: "contact deleted" }); 
}

module.exports = deleteContact
// async (req, res, next) => {
//     const remove = await removeContact(req.params.contactId);
//     res.status(204).json(remove);
//     res.end();
//   }