const Contacts = require("../../models/contactsSchema");


const  getAllContactsServices=async(owner,{skip,limit})=>{
    const result = await Contacts.find({owner})
    .select({__v:0})
    .skip(skip)
    .limit(limit)
    .sort({favorite:false})
        return result;
}
module.exports=getAllContactsServices