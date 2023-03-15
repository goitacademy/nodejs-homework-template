const Contacts = require('../../models/contactsSchema')
// const UserSchema= require('../../models/userSchema')


const addContactServices=async({name,email, phone},owner)=>{
    
  const result =  new Contacts({name,email, phone,favorite:'false',owner} )
 
    await result.save()
  return result
}
module.exports=addContactServices