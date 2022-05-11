const Contact= require("./schemas/Contact")

const getAllContacts =async()=>{
    return Contact.find()
}
const getContactById=async(id)=>{
    return Contact.findOne({_id:id})
}
const postNewContact=async(name,email,phone,favorite)=>{
    return Contact.create({name,email,phone,favorite})
}
const deleteContact=async(id)=>{
    return Contact.remove({_id:id})
}
const updateContact=async(id,name,email,phone,favorite)=>{
    return Contact.updateOne({_id:id},{name:name,email:email,phone:phone,favorite:favorite})
}
const updateContactFavorite=async(id,favorite)=>{
    return Contact.updateOne({_id:id},{favorite:favorite})
}
const getAllFavorite =async()=>{
    return Contact.find({favorite:true})
}
module.exports={getAllContacts,getContactById,postNewContact,deleteContact,updateContact,updateContactFavorite,getAllFavorite}