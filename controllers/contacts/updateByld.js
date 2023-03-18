const { Contact } = require("../../models");

const updateById = async (req, res) => {
   const { contactId } = req.params;
   const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
   });
   if (!updatedContact) {
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
      message: "Contact updated",
      data: {
         result: updatedContact,
      },
   });
};

module.exports = updateById;
