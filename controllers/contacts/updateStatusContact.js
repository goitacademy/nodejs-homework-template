const {Contact} = require('../../models/contact');

const updateStatusContact = async (req, res) => {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
        if(!result){
          return res.status(400).json({ message: "missing field favorite" });
        }
      res.json({status: "success", code: 201, data:(result)});
}
  

  module.exports = updateStatusContact;