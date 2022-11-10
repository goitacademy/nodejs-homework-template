// const contactOperation = require("../../models/contacts");
const { Contact } = require("../../model");

const getAll = async (req, res) => {
      const result = await Contact.find({});
      // const contacts = await contactOperation.listContacts();
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      }); 
  }

  module.exports = getAll;