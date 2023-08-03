const {contacts}=require('../../models')
const getById=async (req, res, next) => {
      const { contactId } = req.params;
      const oneContact = await contacts.getContactById(contactId);
      if (!oneContact) {
        const error = new Error("Not found contact");
        error.status = 404;
        throw error;
      }
      return res.json({
        status: "success",
        code: 200,
        data: {
          oneContact,
        },
      });
  }

  module.exports=getById