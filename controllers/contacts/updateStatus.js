const { Contact } = require("../../models");

const updateStatus = async (req, res) => {
   const { contactId } = req.params;
   const { favorite } = req.body;
   const updatedContactStatus = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
   );
   if (!updatedContactStatus) {
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
      message: "Contact status updated",
      data: {
         result: updatedContactStatus,
      },
   });
};

module.exports = updateStatus;
