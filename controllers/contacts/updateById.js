const {Contact} = require('../../models/contact')
const {RequestError} = require('../../heplers') 



const updateById = async (req, res, next) => {
   

  
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if(!result){
        throw RequestError(404, "Not found")
      }
      res.json(result)
 
    }

    module.exports = updateById