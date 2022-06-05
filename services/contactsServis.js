const {Contact}=require('../db/postModal')
const {WrongParametersError,UpdateParametersError}=require('../helpers/errors')

const getContacts=async()=>{
    const contacts= await Contact.find({});
    return contacts
}

const getIdContacts= async(contactId)=>{
    const contacts= await Contact.findById(contactId);
    if(!contacts){
        throw new WrongParametersError(`failure, no user with id '${contactId}'`)
    }  
    return contacts
}

const putContacts=async(contactId,{ name,email,phone})=>{
    const contacts =   await Contact.findByIdAndUpdate(contactId,
        {$set:{ name,email,phone}})
    return contacts
}

const postContacts= async ({name,email,phone})=>{
    const contacts= new Contact({ 
        name,
        email,
        phone})
        const contact=     await contacts.save();   
return contact
    }

const deleteContacts=async(contactId)=>{
    const contacts=  await Contact.findByIdAndDelete(contactId);
return contacts
}

const updateStatusContact=async(contactId,{favorite})=>{
    const contacts =   await Contact.findByIdAndUpdate(contactId, {favorite})
   if(!contacts){
        throw new UpdateParametersError()
   }  
    return contacts
    
}

module.exports={
    getContacts,
    getIdContacts,
    putContacts,
    postContacts,
    deleteContacts,
    updateStatusContact
}