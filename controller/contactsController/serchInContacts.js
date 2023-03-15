// const Contacts = require("../../models/contactsSchema");
const serchInContactServices=require('../../services/contactServices/serchInContactServices')
const serchInContacts = async () => {
    const {  favorite=false } = req.query;
    console.log("favorite",favorite);
    try {
      const result = await serchInContactServices(favorite)
      // const result = await Contacts.find({ name });
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
          message: `Not found :${favorite}`,
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