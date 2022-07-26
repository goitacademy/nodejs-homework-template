const {Contact,schemas} = require("../../models/contact")
const {createErr} = require("../../helpers")

const updateById = async (req, res, next) => {

      const {error} = schemas.add.validate(req.body)
      if (error) {
       throw createErr(400,"missing fields")
      }
      const {id} = req.params
      const result = await Contact.findByIdAndUpdate(id,req.body,{new:true})
      if (!result) {
         throw createErr(404)
      }
      res.json(result)

  }
  module.exports = updateById