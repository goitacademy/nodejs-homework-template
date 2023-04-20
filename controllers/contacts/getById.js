const contactsOperation = require("../../models/contacts");

const getById = async (req, res) => { 
    
      const { contactId } = req.params;
      const result = await contactsOperation.getById(contactId);
      if (!result) {
        const error = new Error(`Contact with id=${contactId} not found`);
        error.status = 404;
        throw error;
      }
      res.json({
        status: "success",
        code: 200,
        message: "Not found",
        data: {
          result,
        },
      });    
  };

  module.exports = getById;
  