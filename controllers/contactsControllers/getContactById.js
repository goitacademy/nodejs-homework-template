const Contact = require("../../models/contacts");
const { HttpError } = require("../../helpers");


const getContactById = async (req, res, next) => {
   
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
     next(HttpError(404, `Product with id ${id} not found`));
    }
    res.json(result)
 
}

module.exports = getContactById