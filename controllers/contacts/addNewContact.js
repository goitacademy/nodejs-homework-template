const {Contact, Joischema} = require("../../Schema/contactSchema");
const { httpError } = require("../../helpers/httpError");


const addNewContact = async (req, res) => {
  
    const { error } = Joischema.validate(req.body);

    if (error) {
      throw httpError(400, "Missing required name field");
    }
    const response = Contact.create(req.body);

    res.status(201).json(response);

 }

module.exports = addNewContact;