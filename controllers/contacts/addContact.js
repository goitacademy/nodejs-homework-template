const { Contact}=require('../../models/contact')
const addContact=async (req, res, next) => {
      const body = req.body;
      const newContact = await Contact.create(body);
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          newContact,
        },
      });
  }

  module.exports=addContact