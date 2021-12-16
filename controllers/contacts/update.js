const {Contact} = require("../../models")

const updateContact = async (req, res, next) => {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
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

  module.exports = updateContact