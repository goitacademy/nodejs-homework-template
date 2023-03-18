const { Contact } = require("../../models");

const getById = async (req, res) => {
   const { contactId } = req.params;
   const contact = await Contact.findById(contactId);
   if (!contact) {
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
      data: {
         result: contact,
      },
   });
};

module.exports = getById;
