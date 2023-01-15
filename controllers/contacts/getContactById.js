const {Contact} = require("../../Schema/contactSchema");
const { httpError } = require("../../helpers/httpError");

const getContactsById = async (req, res) => {
  
    const { contactId } = req.params;
    const response = await Contact.findById(contactId);

    if (!response) {
      throw httpError(404, "Not found");  
    };

    res.status(200).json(response );}



module.exports = getContactsById;