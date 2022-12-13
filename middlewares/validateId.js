const { HttpError } = require("../helpers");
const Contact = require("../models/contacts");


const validateId = () => {
    const func =
         (req, res, next) => {
            const { id } = req.params;
            console.log(id)
            const result = Contact.findById( id );
            // console.log(`Result!!!!!!${result }`)
    if (result === null) {
       next(HttpError(404, `Can't find contact with id:${id}`));
    }
    
    next()
   }
return func

}

module.exports = validateId