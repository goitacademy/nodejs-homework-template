const { Contact } = require("../../models");

const removeById = async (req, res) => {
   const { contactId } = req.params;
   const removedContact = await Contact.findByIdAndRemove(contactId);
   if (!removedContact) {
      res.status(404).json({
         status: "ERROR",
         code: 404,
         massage: `Contact with ID=${contactId} not found`,
      });
      return;
   }
   res.json({
      status: "Success",
      code: 200,
      message: "Contact deleted",
      data: {
         result: removedContact,
      },
   });
};

module.exports = removeById;
