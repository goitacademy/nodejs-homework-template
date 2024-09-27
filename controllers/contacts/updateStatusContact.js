const {Contact, FavoriteSchemaContact} = require("../../Schema/contactSchema");
const { httpError } = require("../../helpers/httpError");

const updateStatusContact = async (req, res) => {
  
    const { error } = FavoriteSchemaContact.validate(req.body);

    if (error) {
      throw httpError(400, "Missing fields");
    }

    const { contactId } = req.params;
    const { favorite } = req.body;
    const response = await Contact.findByIdAndUpdate(contactId, {favorite});

    if (!response) {
      throw httpError(404, "Not found");  
    };

    res.status(200).json(response)

 
}

module.exports = updateStatusContact ;