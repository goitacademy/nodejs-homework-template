const {Contact} = require("../../models");

const removeContact = async (req, res) => {
      const {id} = req.params;
      const result = await Contact.findByIdAndRemove(id);
      if(!result) {
        const error = new Error("Not found"); 
        error.status = 404;
        throw error;
      }
      res.json({
        message: "Contact deleted",
      }) 
  }

  module.exports = removeContact;