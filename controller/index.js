const {Contact} = require('../service/schemas/contact')

const listContactsController = async (req, res) => {
  
    const results = await Contact.find({});
    res.json({
      status: 'success',
      code: 200,
      data: {
        results,
      },
    });
  
}

const getContactByIdController = async (req, res, next) => {
  const  {contactId}  = req.params;
  try{
    const result = await Contact.getContactById(contactId)
    if(result){
      res.json({
        status: 'success',
        code: 200,
        data: { result }
      })
    }
    res.status(404).json({
      status: 'error',
      code: 404,
      message: "Not found",
      })
  }catch(error){
    console.error(error)
    next(error)
  }
} 

const removeContactController = async (req, res, next) => {
  const { _id } = req.params;
  try{
    const result = await Contact.removeContact(_id)
    if(result){
      res.status(200).json({
        status: 'success',
        code: 200,
        message: "contact deleted"
      })
    }
    res.status(404).json({
      status: 'error',
      code: 404,
      message: "Not found"
  })
} catch(error){
  console.error(error)
  next(error)
}}

const addContactController = async (req, res, next) => {
  const {name, email, phone} = req.body
  try{
    const result = await Contact.createContact({ name, email, phone })
    res.status(201).json({
      status: 'created',
      code: 201,
      data: { 
        result 
      },
    });
    
  }catch(error){
    console.error(error)
    next(error)
  }
}

const updateContactController = async (req, res, next) => {
  const {name, email, phone} = req.body
  const { _id } = req.params;
  try{
    const result = await Contact.updateContact(_id, { name, email, phone })
    if(result){
      res.json({
        status: 'success',
        code: 200,
        data: { 
          result, 
        }
      })
    }
    res.status(404).json({
      status: 'not found',
      code: 404,
      message:"Not found"
    })
  } catch(error) {
    console.error(error)
    next(error)
  }
}



module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
}
