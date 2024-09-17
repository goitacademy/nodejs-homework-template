const {isValidObjectId}=require('mongoose')
const {HttpErrors}=require('../helpers')
const isValideId=(req, res, next)=>{
    const {id}=req.params
    if(!isValidObjectId(id)){
        next(HttpErrors(400, `${id} is not valid id`))
    }else{
        next()
    }
}

module.exports=isValideId