const {Contact} = require("../../models")

const addNewContact = async (req, res) => {
     const result = await Contact.create(req.body)
      res.json({  
     status: "success",
     code: 201,
     data: {
       result
     }
   })

}

   module.exports = addNewContact