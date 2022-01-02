const {Contact} = require("../../models")

const getAll = async (req, res, next) => {
  const {_id} = req.user
  const {page = 1, limit = 20} = req.query
  const skip = (page-1) * limit
    try { 
      const contacts = await Contact.find({owner:_id}, "", {skip, limit: +limit}).populate("owner", "_id email subscription")
     res.json({
       status: "success",
       code: 200,
       data: {
         contacts
       }
     })
    
    } catch (error) {
      next(error)
    }
   }

   module.exports = getAll;