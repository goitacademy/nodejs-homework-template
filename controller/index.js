const {Contact} = require('../service/schemas/contact')

const listContactsController = async (req, res) => {
    const {_id} = req.user
    let {page=1, limit=5, favorite} = req.query;
    
    limit = parseInt(limit)>20 ? 20 : parseInt(limit)
    const viewContact = parseInt(page)===1 || parseInt(page)===0 ? 0 : (parseInt(page)-1)*limit
    
    const viewFavorite = favorite==="false" || favorite==="true" ? favorite : null
    if(!viewFavorite){
      return res.status(404).json({
        status: 'error',
         code: 404,
         message: "Not found",
         })
    }
  

    const data = await Contact.find({owner:_id, favorite: viewFavorite})
    .skip(viewContact)
    .limit(limit)
    .sort('createdAt')

    try{
    res.json({
      status: 'success',
      code: 200,
      data,
      page,
      limit
    })}catch(error){
      console.error(error)
    }
  
}

const getContactByIdController = async (req , res) => {

  const {_id} = req.user
  const id = req.params.contactId

    await Contact.findOne({_id: id, owner:_id })
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

 const removeContactController = async (req, res) => {
  const {_id} = req.user

  const id = req.params.contactId

  await Contact.findOneAndRemove({_id: id, owner: _id})
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


const addContactController = async (req, res) => {
  const {_id} = req.user
  let {name, email, phone, favorite} = req.body

  if(!favorite){
    favorite = false
  }
  try{
  const contact = new Contact({
    name, email, phone, favorite, owner:_id
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

const updateContactController = async (req, res) => {
  const id = req.params.contactId
  const name = req.body.name
  const email = req.body.email
  const phone = req.body.phone

  const {_id} = req.user

  await Contact.findOneAndUpdate({_id: id, owner:_id}, {name, email, phone})
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
  const {_id} = req.user
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

await Contact.findOneAndUpdate ({_id: id, owner:_id}, {favorite})
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
