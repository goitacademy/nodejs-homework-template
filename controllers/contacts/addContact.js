const contactsOperation=require("../../models/contacts");

const addContact=async (req, res) => {
   const {name,email,phone}=req.body;
   const result = await contactsOperation.addContact(name,email,phone)
   res.status(201).json({
        status:"success",
        code:201,
        data:{result
        }
      });
    
  }

  module.exports=addContact;