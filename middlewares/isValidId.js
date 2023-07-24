 /* const {isValidObjectId} = require("mongoose");

const {RequestError} = require("../helpers");

const isValidId = (req, _, next) => { 
    const {contactId} = req.params;
    const isCorrectId = isValidObjectId(contactId);
    if(!isCorrectId){
        const error = RequestError(400, `${contactId} is not corrent id format`);
        next(error);
    }
    next();
} */

module.exports.isValidId = (middleware)=>{
    return async ( req, res)=> {
        try{
            await middleware(req, res);
        }catch (err){
            return res.status(404).json({status: "Not found, catch"});
        }
    };
};