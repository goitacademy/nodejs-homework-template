const { Contact } = require("../../models");

const add = async (req, res) => {
   const newContact = await Contact.create(req.body);
   res.status(201).json({
      status: "Success",
      code: 201,
      message: "Contact added",
      data: {
         result: newContact,
      },
   });
};

module.exports = add;
