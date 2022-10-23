const {Contact} = require("../../models/contact")
const { RequestError } = require("../../helpers/RequestError")



const removeContact = async (req, res) => {
    const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  console.log(result);
    if (!result) {
      throw RequestError(404, "Not found")
    }  
      res.json({
      message: "Delete success"
    })

}

module.exports = removeContact;