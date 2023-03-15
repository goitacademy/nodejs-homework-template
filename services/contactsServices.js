// const Contacts = require("../models/contactsSchema");
//const {NotFoundError}=require('../helpers/errors')

 
// const getByIdContactServices= async(id)=>{
//     const result = await Contacts.findById({_id:id});
//     if (!result) {
//         if (!result) {
//             throw new NotFoundError( `Not found task id: ${id}`)
//             } 
     
//        } 
//     return result;
// }


// const serchInContactServices=async()=>{
//     const result = await Contacts.find({ favorite:true });
// return result
// }
// const addContactServices=async({name,email, phone})=>{
//     const result =  new Contacts({name,email, phone,favorite:'false'} )
//   await result.save()
//   return result
// }
// const chengOfPartContactServices=async(id,status)=>{
//     const result = await Contacts.findByIdAndUpdate(
//      id,{favorite:status},{ new: true },
//       );
//       return result;
// }
// module.exports={
//     getAllContactsServices,
//     getByIdContactServices,
//     removeContactServices,
//     updateContactServices,
//     serchInContactServices,
//     addContactServices,
//     chengOfPartContactServices,
// }
