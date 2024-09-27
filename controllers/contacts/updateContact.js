const {Contact, Joischema} = require("../../Schema/contactSchema");
const { httpError } = require("../../helpers/httpError");

const updateContact = async (req, res) => {

    const { error } = Joischema.validate(req.body);

    if (error) {
      throw httpError(400, "Missing fields");
    }

    const { contactId } = req.params;
    const response = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

    if (!response) {
      throw httpError(404, "Not found");  
    };

    res.status(200).json(response );

  
}

module.exports = updateContact;