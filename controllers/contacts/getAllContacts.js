const { Contact } = require("../../models/contacts");

 
 const getAllContacts = async (req, res, next) => {
    try {
      const { _id } = req.user;
      console.log(_id);
      const contacts = await Contact.find(
        { owner: _id },
        "-updatedAt, -createdAt, -__v"
      );
  
      res.json({
        status: "success",
        code: 200,
        data: {
          result: contacts,
        },
      });
    } catch (error) {
      next(error);
      
    }
  }

  module.exports = getAllContacts 