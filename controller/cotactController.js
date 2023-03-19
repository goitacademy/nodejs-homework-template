
const Contacts = require('../models/contactsModel');
const {validationData} = require('../contactMiddleware/contactMiddleware')

const getContactsList=async (req, res, next) => {
    try{
        res.status(200).json(await Contacts.find())
    }catch(err){
        console.log(err)
    }      
};

const getContactById= async (req, res, next) => {
    const {contactId} = req.params; 
    try{
        const contact = await  Contacts.find({_id:String(contactId)});        
        res.status(200).json(contact);
    } catch(err){
        console.log(err)
        return res.status(404).json({ message: 'Not found' })
    }     
};

const deleteContactById= async (req, res, next) => {
    const {contactId} = req.params;

    
    try{
        const contact = await  Contacts.find({_id:String(contactId)});
        if (contact) {
            await Contacts.findByIdAndRemove({_id:String(contactId)});     
            res.status(200).json({ message: 'contact deleted' })
        }
    }catch(err){
        console.log(err) 
        res.status(404).json( {message: 'Not found'});
    }     
};

const createContact=async (req, res, next) => {      
    const {name,email,phone,favorite} = req.body; 
    const {value,error}= await validationData(name, email, phone,favorite);
    if (!name || !email || !phone) {                   
        return  res.status(400).json({ message: "required data missing. check the fields name,email and phone" })
    } 

    if(error) {
        return  res.status(400).json({ message: `${error.message}`})        
    } 

    try{       
        res.status(201).json(await Contacts.create(
            {name:value.name,
            email:value.email,
            phone:value.phone,
            favorite:value.favorite || false})
        )        
    }catch(err){
        console.log(err)    
    }     
};

const putUpdateContact = async (req, res, next) => {
    const {contactId} = req.params;
    const {name,email,phone,favorite} = req.body; 
    const {value,error}= await validationData(name, email, phone,favorite);
    if (!name || !email || !phone) {                   
        return  res.status(400).json({message: "required data missing. check the fields name,email and phone"})
    } 

    if(error) {
        return  res.status(400).json({ message: `${error.message}`})        
    } 
    
    try{        
        res.status(200).json(await Contacts.findByIdAndUpdate({_id:String(contactId)}, 
            {name:value.name,
            email:value.email,
            phone:value.phone,
            favorite:value.favorite|| false}, { new: true }));
           
    }catch(err){
        console.log(err)
    }    
};

 const updateStatusContact=async(req, res, next) => {
    const {contactId} = req.params; 
    const {name,email,phone,favorite} = req.body; 
    const {value,error}= await validationData(name, email, phone,favorite);
    if (!name || !email || !phone|| !favorite) {                   
        return  res.status(400).json({message: "required data missing. check the fields name,email,phone and favorite"})
    } 

    if(error) {
        return  res.status(400).json({ message: `${error.message}`})        
    } 

    try{
        res.status(200).json(await Contacts.findByIdAndUpdate({_id:String(contactId)}, 
        {name:value.name,
        email:value.email,
        phone:value.phone,
        favorite:value.favorite}, { new: true }));      

    }catch(err){
        console.log(err)
    }    
};
   

module.exports = {
    getContactsList,
    getContactById,
    deleteContactById,
    createContact,
    putUpdateContact,
    updateStatusContact
}