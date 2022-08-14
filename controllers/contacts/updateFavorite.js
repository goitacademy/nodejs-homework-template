const {Contact,schemas} = require("../../models/contact")
const {createErr} = require("../../helpers")


const updateFavorite = async (req, res, next)=>{
   const {error} = schemas.updateFavorite.validate(req.body)
      if (error) {
       throw createErr(400,"missing field favorite")
      }
    const {id} = req.params
    const result = await Contact.findByIdAndUpdate(id,req.body,{new: true})
    if (!result) {
      throw createErr(404)
    }
    res.json(result)
}

module.exports = updateFavorite