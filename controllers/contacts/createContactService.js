const {addContact} = require("../../services/index");
    
const HttpError = require("../../helpers/HttpError");

async function createContactService(req, res, next) {
    const { name, email, phone, favorite, owner, } = req.body;
  
    try {
      const newContact = await addContact({name, email, phone, favorite, owner});
      return res.status(201).json(newContact);
    } catch (error) {
      return next(new HttpError(400, "Missing fields"));
    } 
}

module.exports = {createContactService};