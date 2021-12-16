const {Contact} = require("../../models")

const updateFavorite = async (req, res, next) => {
      const {contactId} = req.params;
      const {favorite} = req.body
      const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true})
      if (!result) {
        const error = new Error (`Not found`)
        error.status = 404;
        throw error;
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      })
     
  }

  module.exports = updateFavorite