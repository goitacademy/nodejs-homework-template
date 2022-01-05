const { Contact } = require("../../model")


const deleteById = async (req, res, next) => {
    const {id} = req.params
    const contacts = await Contact.findByIdAndRemove(id)
    if (contacts) {
      res.json({
        message: "contact deleted",
      })
    } else {
      res.status(404).json({
        message: "Not found",
      })
    }
  }
  module.exports = deleteById