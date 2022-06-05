
const { 
  getContacts,
  getIdContacts,
  putContacts,
  postContacts,
  deleteContacts,
  updateStatusContact}=require('../services/contactsServis')
const getContactsController=async (req, res, next) => {
 const contacts= await getContacts()
     res.json({ contacts})
     }

const getIdContactsController=async (req, res) => {
   const {contactId}=req.params;
   const contacts= await getIdContacts(contactId)
    res.json({contacts, message: 'template message'})
    }

const putContactsController= async (req, res, next) => {
   const{
    name,
    email,
    phone,
    }=req.body;
    const {contactId}=req.params;
    await putContacts(contactId,{name,email,phone})
   
    res.json({message: 'success OK put' })
   }

const deleteContactsController=async (req, res, next) => {
 const {contactId}=req.params;
 await deleteContacts(contactId)
    res.json({ message: 'success OK delete'})
   }
const postContactsController=async (req, res) => {
    const{name,email,phone}=req.body;
    await postContacts({ name,email,phone})
    res.json({ status: 'success OK' })
    }
const patchIdContactsController=async (req, res) => {
      const {contactId}=req.params;
      const{favorite}=req.body; 
      await updateStatusContact(contactId,{favorite})
      res.json({ status: 'success OK' })
   }

 module.exports={
getContactsController,
getIdContactsController,
putContactsController,
postContactsController,
deleteContactsController,
patchIdContactsController}