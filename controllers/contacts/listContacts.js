const Contact = require("../../models/contactsModel");

const listContacts = async (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          result: await Contact.find(),
        },
      });
    } catch (error) {
      res.status(400).json({ code: 404, message: error.message });
    }
  };

module.exports = listContacts;