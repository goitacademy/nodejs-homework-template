const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const { validateId } = require("../../middlewares");


const getContactById = async (req, res, next) => {
   
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
     next(HttpError(404, "Not found"));
    }
    res.json(result)
 
}

module.exports = getContactById