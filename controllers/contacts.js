
const {Contact} = require("../models")

const listContacts = async (req, res) => {
  const { _id } = req.user
  const { page = 1, limit = 20 } = req.query
  const skip = (page-1)*limit
  const contacts = await Contact.find({owner:_id},"",{skip,limit:Number(limit)}).populate("owner", "_id name email")
  res.json({
    status: 200,
    data:  contacts 
  })
} 

const getContactById = async (req,res) => {
  const { id } = req.params;
  const contacts = await Contact.findById(id)
   
    if (!contacts) {
      throw new  Error(`Product with id=${id} not found`)
    }
  res.json({
    status: 200,
    data: {  contacts }
  })
    }


const addContact = async (req, res) => {
  const {_id}= req.user
  const result = await Contact.create({...req.body, owner:_id})
  res.status(201).json({
    code: 201,
    data: {result}
  })
}




const updateContact = async (req, res) => {
      const {id} = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body,{new:true})
  if (!result) {
      throw new  Error(`Product with id=${id} not found`)
  }
   res.json({
    status: 200,
    data: { result}
  })
}
const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id)
  if (!result) {
      throw new  Error(`Product with id=${id} not found`)
  }
   res.json({
     status: 200,
     message:"product deleted",
    data: { result}
  })
}
const updateFav = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(id, {favorite}, { new: true })
  if (!result) {
      throw new  Error(`Product with id=${id} not found`)
  }
   res.json({
    status: 200,
    data: { result}
  })
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFav
}
