const Contacts = require('../../models/contactsSchema')

const removeContactServices= async(contactId)=>{
    const result = await Contacts.findByIdAndRemove(contactId);
   
    return result
}
module.exports=removeContactServices