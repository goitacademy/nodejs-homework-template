const contacts = require("../../models/contacts");
const { createError } = require("../../helpers/createError");
async function getContactsById(req, res, next) {
     
       const { id } = req.params;

       const result = await contacts.getContactById({ id });
       if (!result) {
         throw createError({ status: 404, message: "Not found" });
       }
       res.json(result);
    
}
module.exports = getContactsById;
