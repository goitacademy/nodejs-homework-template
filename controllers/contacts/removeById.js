const {Contact} = require("../../models");

const removeById = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if(result){
    res.json({ 
      status: 'success',
      code: 200,
      message: "contact deleted",
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

module.exports = removeById;