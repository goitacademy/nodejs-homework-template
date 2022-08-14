const {Contact,} = require("../../models/contact")
const {createErr} = require("../../helpers")

const removeById = async (req, res, next) => {

      const {id} = req.params
      const result  = await Contact.findByIdAndRemove(id)
      if (!result) {
        throw createErr(404)
      }
      res.json({
        message: "Contact deleted"
      })
  }

  module.exports = removeById
