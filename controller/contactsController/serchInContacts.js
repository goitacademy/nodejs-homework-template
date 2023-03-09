const Contacts = require("../../models/contactsSchema");

const serchInContacts = async () => {
    const { name, email, phone, favorite } = req.query;
    console.log("name", name);
    try {
      const result = await Contacts.find({ name });
      if (result) {
        res.json({
          status: "success",
          code: 200,
          data: { contact: result },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `Not found : ${name}||${email}||${phone}||${favorite}`,
          data: "Not Found",
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
     
    }
    res.json(result);
  };
  module.exports=serchInContacts;