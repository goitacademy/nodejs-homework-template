//  const Contacts = require("../../models/contactsSchema");
 const getByIdContactServices=require('../../services/contactServices/getByIdContactServices')
// const mongoose = require('mongoose');

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    console.log('contactId',contactId)
    //  const { _id: owner } = req.user;
    // mongoose.ObjectId(id)
    try {
      const result = await getByIdContactServices(contactId);
     
 res.json({
          status: "success",
          code: 200,
          data: { contact: result },
        });
        
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
module.exports=getById;