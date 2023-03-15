const Contacts = require('../../models/contactsSchema')

const chengOfPartContactServices=async(id,status)=>{
    const result = await Contacts.findByIdAndUpdate(
     id,{favorite:status},{ new: true },
      );
      return result;
}
module.exports=chengOfPartContactServices