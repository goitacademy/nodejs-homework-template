const createError = require("http-errors");
const {Contact} = require("../../models");

async function updateStatusContact (req, res, next) {
      const {contactId} = req.params;
      const {favorite} = req.body;
      console.log(favorite);
      if(!req.body){
        throw createError(400, "Missing field favorite"); 
      }
      const changedContact = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
      if(!changedContact) {
        throw createError(404, "Not found");
      };
      res.json({
        status: "200",
        data: {
          changedContact
        }
      });
  };

  module.exports = updateStatusContact;