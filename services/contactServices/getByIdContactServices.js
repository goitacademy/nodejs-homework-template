const Contacts = require("../../models/contactsSchema");
const {NotFoundError}=require('../../helpers/errors')

const getByIdContactServices= async(id)=>{
    const result = await Contacts.findById({_id:id}); 
        if (!result) {
            throw new NotFoundError( `Not found task id: ${id}`)
            } 
        return result
       } 
 
module.exports=getByIdContactServices