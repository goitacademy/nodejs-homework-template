const {Contact} = require('../../models/contact')
const {RequestError} = require('../../heplers') 


const removeById = async (req, res, next) => {

    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId)
    if(!result) {
     throw RequestError(404, "Not found")
   }
   res.json({
     mesage: "Contact remove"
   })
   

   }

   module.exports = removeById;