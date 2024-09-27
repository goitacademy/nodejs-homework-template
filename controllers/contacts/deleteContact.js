const {Contact} = require("../../Schema/contactSchema");
const { httpError } = require("../../helpers/httpError");

const deleteContact = async (req, res) => {
  
    const { contactId } = req.params;
    const response = await Contact.findOneAndRemove({_id: contactId});

    if (!response) {
      throw httpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
   

  }

module.exports = deleteContact;