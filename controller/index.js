const {Contact} = require('../service/schemas/contact')

const listContactsController = async (req, res) => {
  
    const data = await Contact.find({});
    try{
    res.json({
      status: 'success',
      code: 200,
      data
      
    })}catch(error){
      console.error(error)
    }
  
}

const getContactByIdController = async ({ id } , res) => {
    await Contact.findById(id)
    .then(function (data) {
       return  res.json({
          status: 'success',
          code: 200,
          data
        })
    })
    .catch((err) => {
      console.log(err)
      res.status(404).json({
        status: 'error',
         code: 404,
         message: "Not found",
         })})
    }

 const removeContactController = async ({ id }, res) => {
  await Contact.deleteOne({_id: id})
  .then(function() {
    return  res.status(200).json({
      status: 'success',
      code: 200,
      message: "contact deleted"
    })
  })
  .catch((err) => {
    console.log(err)
    res.status(404).json({
      status: 'error',
      code: 404,
      message: "Not found"
  })
  })
 }


const addContactController = async (body, res) => {
  let {name, email, phone, favorite} = body
  if(!favorite){
    favorite = false
  }
  try{
  const contact = new Contact({
    name, email, phone, favorite
  });
   const data = await contact.save()
  res.status(201).json({
    status: 'created',
    code: 201,
    data,
  })}catch(err){
    console.log(err)
    res.status(400).json({
      status: 'error',
      code: 400,
      message: "missing required name field"
  })
  }
}

const updateContactController = async ({id, name, email, phone}, res) => {
  await Contact.findByIdAndUpdate(id, {name, email, phone})
  .then(function(data){
    return res.json({
      status: 'success',
      code: 200,
      data
    })
  }).catch((err) => {
    console.log(err)
    res.status(404).json({
      status: 'not found',
      code: 404,
      message:"Not found"
    })
  })
}

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId
  const body = req.body
  const favorite = body.favorite
  if( Object.keys(body).length === 0){
    return   res.status(400).json({
      status: 'error',
      code: 400,
      message: "missing field favorite"
  })
  }

await Contact.findByIdAndUpdate(id, {favorite})
.then(function(data){
  return res.json({
    status: 'success',
    code: 200,
    data
  })
})
.catch((err) => {
  console.log(err)
  res.status(404).json({
    status: 'not found',
    code: 404,
    message:"Not found"
  })
})

}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContact,
}
