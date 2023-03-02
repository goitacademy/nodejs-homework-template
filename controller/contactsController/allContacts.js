const Contacts = require("../../models/contactsSchema");
const allContacts = async (req, res, next) => {
    try {
      const result = await Contacts.find({});
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    } catch (e) {
      console.error(e);
      next(e); 
  
    }
  };
  module.exports=allContacts