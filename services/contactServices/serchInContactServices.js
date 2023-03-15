const Contacts = require('../../models/contactsSchema')

const serchInContactServices=async()=>{
    const result = await Contacts.find({ favorite:true });
return result
}
module.exports=serchInContactServices