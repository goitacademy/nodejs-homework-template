const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const contactsPath = path.resolve("../../model/contacts.json");

const listContacts=async ()=>{
  try{
    return await fs.readFile(contactsPath, 'utf8');
  }catch(err){
    console.error(err)
  }

}

let listContacts2 = require("../../model/contacts.json");
let contacts = [
  {
    id: 1,
    name: "Allen Raymond",
    email: "nulla.ante@vestibull.co.uk",
    phone: "(992) 914-37976",
  },
  {
    id: 2,
    name: "Chaim Lewis",
    email: "dui.in@egetlacus.ca",
    phone: "(294) 840-66855",
  },
  {
    id: 3,
    name: "Kennedy Lane",
    email: "mattis.Cras@nonenimMauris.net",
    phone: "(542) 451-7038",
  },
  {
    id: 4,
    name: "Wylie Pope",
    email: "est@utquamvel.net",
    phone: "(692) 802-2949",
  },
  {
    id: 5,
    name: "Cyrus Jackson",
    email: "nibh@semsempererat.com",
    phone: "(501) 472-5218",
  },
  {
    id: 6,
    name: "Abbot Franks",
    email: "scelerisque@magnis.org",
    phone: "(186) 568-3720",
  },
  {
    id: 7,
    name: "Reuben Henry",
    email: "pharetra.ut@dictum.co.uk",
    phone: "(715) 598-5792",
  },
  {
    id: 8,
    name: "Simon Morton",
    email: "dui.Fusce.diam@Donec.com",
    phone: "(233) 738-2360",
  },
  {
    id: 9,
    name: "Thomas Lucas",
    email: "nec@Nulla.com",
    phone: "(704) 398-7993",
  },
  {
    id: 10,
    name: "Alec Howard",
    email: "Donec.elementum@scelerisquescelerisquedui.net",
    phone: "(748) 206-2688",
  },
];
//Всі контакти
router.get("/", async (req, res, next) => {
  await res.status(200).json(listContacts());
});
// вибір контакту по ІД
router.get("/:contactId", async (req, res, next) => {
  const [contact] = contacts.filter(cont => cont.id.toString() === req.params.contactId);
  if (contact === undefined) {
   await res.status(404).json({ message: "Not Found" });
  return;
  }
 await res.status(200).json({contact} );
});
// Додати контакт
router.post("/", async (req, res, next) => {
  const {name, email, phone}=req.body;
  contacts.push({id:new Date().getTime().toString(),name, email, phone})
try{ 
  if(!name||!email||!phone){
      await res.status(400).json({message: "missing required field"});
return;
  }
  await res.status(201).json(contacts);
}catch(err){
 await res.status(404).json({message:err});
}
});
// Видалення контакту
router.delete("/:contactId", async (req, res, next) => {
try{ 
let len=contacts.length;
contacts=contacts.filter(cont=>cont.id.toString()!==req.params.contactId);
    if(contacts.length===len){
      await res.status(404).json({message: "Not Found"});
return;
  }
  await res.status(200).json({message: "contact deleted"});
}catch(err){
 await res.status(404).json({message:err});
}});
// Змінити контакт
router.put("/:contactId", async (req, res, next) => {
 const {name,email,phone}=req.body;
 contacts=contacts.map(contact => {
   if(contact.id.toString()===req.params.contactId){
     contact.name=name;
     contact.email=email;
     contact.phone=phone;
   }
   return contact;
 });
 await res.json({ message: "contact changed" });
});

module.exports = router;
