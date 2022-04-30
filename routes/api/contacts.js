const express = require("express");
const Joi =require("joi")
const newUserValidation=(data)=>{
  const schema=Joi.object({
      name:Joi.string().min(2).max(255).required(),
      email:Joi.string().min(2).max(255).required().email(),
      phone:Joi.string().min(2).max(20).required(),
  })

  return schema.validate(data)
}
const changeUserValidation=(data)=>{
  const schema=Joi.object({
      name:Joi.string().min(2).max(255),
      email:Joi.string().min(2).max(255).email(),
      phone:Joi.string().min(2).max(20),
  }).min(1)

  return schema.validate(data)
}
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (!data) {
    res.status(404).json({ "message": "Not found" });
  }
  res.status(200).json(data);
});

router.post("/", async (req, res, next) => {
  const {error}=newUserValidation(req.body)
  if(!error){
    const result=await addContact(req.body)
   return res.status(201).json(result);
  }
  res.status(400).json({ "message": "missing required name field"});
 
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (!data) {
    res.status(404).json({ "message": "Not found" });
  }
  await removeContact(req.params.contactId);
  res.status(200).json({ "message": "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const {error}=changeUserValidation(req.body)
  console.log(error);
  if(!error){
    const result=await updateContact(req.params.contactId,req.body)
   return res.status(200).json(result);
  }
  res.status(400).json( {"message": "missing fields"});
 
});

module.exports = router;
