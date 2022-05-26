const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

const contactFile = path.join(__dirname, 'contactList.json');
//сonsole.log(contactFile)
const listContacts = async () => {
    const data = await fs.readFile(contactFile);
    const contacts = JSON.parse(data);
    return contacts;
  };


/*let contacts=[
    {id:'1', name: 'Max', number: '123-45-789'},
    {id:'2', name: 'Jony', number: '123-46-789'},
    {id:'3', name: 'Leo', number: '123-47-789'},
  ];*/
  

const getContacts=async(req, res, next) => {
 const contacts = await listContacts();
     res.json({ contacts,message: 'template message' })
     }

const getIdContacts=async (req, res, next) => {
    let contacts = await listContacts();
    const {contactId}=req.params;
    const [contact]=contacts.filter(el=>el.id === contactId)
   
    if(!contact){
      res.status(400).json({ message: `failure, no user with id '${contactId}'`})
    }
    res.json({contact, message: 'template message'})
    }

const putContacts= async (req, res, next) => {
    let contacts = await listContacts();
    const{
    name,
    number
    }=req.body;
   
    contacts.forEach(el=>{
    if(el.id===req.params.contactId){
    el.name=name,
    el.number=number
    }  
    })
    res.json({ message: 'success OK put' })
   }

const deleteContacts=async (req, res, next) => {
   let contacts = await listContacts();
    contacts= contacts.filter(el=>el.id !== req.params.contactId)
    res.json({contacts, message: 'success OK delete'})
   }
const postContacts=async (req, res) => {
    let contacts = await listContacts();
    const{
    name,
    number
    }=req.body;
    
    contacts.push({
    id: shortid.generate(),
    name,
    number
    })
    res.json({ status: 'success OK' })
    }


 module.exports={
getContacts,
getIdContacts,
putContacts,
postContacts,
deleteContacts,}