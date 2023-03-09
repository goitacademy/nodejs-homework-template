const Contacts = require("../../models/contactsSchema");
const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
    try {
      const result = await Contacts.deleteOne({ _id: contactId });
      if (result) {
        res.json({
          status: "success",
          code: 200,
          data: { contact: result },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `Not found task id: ${id}`,
          data: "Not Found",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  module.exports=removeContact;