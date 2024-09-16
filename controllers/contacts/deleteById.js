const {contacts}=require('../../models')
const deleteById=async (req, res, next) => {
      const { contactId } = req.params;
      const deletedContact = await contacts.removeContact(contactId);
      if (!deletedContact) {
        const error = new Error("Not found contact");
        error.status = 404;
        throw error;
      }
      res.json({ message: "contact deleted" });
  }

  module.exports=deleteById