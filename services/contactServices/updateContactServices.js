const Contacts = require("../../models/contactsSchema");

const updateContactServices=async(id, body)=>{
    const record = await Contacts.findByIdAndUpdate(id, body, {
        new: true,
      });
      return record
}
module.exports=updateContactServices