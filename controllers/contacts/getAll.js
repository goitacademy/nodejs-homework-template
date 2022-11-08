const contactOperation = require("../../models/contacts");

const getAll = async (req, res) => {
      const contacts = await contactOperation.listContacts();
      res.json({
        status: "success",
        code: 200,
        data: {
          result: contacts
        }
      }); 
  }

  module.exports = getAll;