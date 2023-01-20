const {Contact} = require("../../models");

const getById = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findById(id);
  if(result){
    res.json({ 
      status: 'success',
      code: 200,
      data : {
        result 
      }
    })
  } else{
    res.json({
      code: 404,
      message:"Not found",
    })
  }
}

module.exports = getById;