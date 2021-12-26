const {Contact} = require("../../models")

const addNewContact = async (req, res) => {
  const {_id} = req.user
     const result = await Contact.create({owner: _id, ...req.body})
      res.json({  
     status: "success",
     code: 201,
     data: {
       result
     }
   })

}

   module.exports = addNewContact