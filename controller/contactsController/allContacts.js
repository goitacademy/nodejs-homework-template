const Contacts = require("../../models/contactsSchema");
const allContacts = async (req, res, next) => {
    try {
  const {offset, limit}=req.query
  // const{favorite}=req.params  
      const result = await Contacts.find({})
      console.log(result)
      // .skip(offset)
      // .limit(limit)
      // .populate()
      res.json({user:req.user,
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