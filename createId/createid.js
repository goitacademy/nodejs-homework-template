
const { v4: uuidv4 } = require('uuid');


const newId = async ()=>{
    return uuidv4();
}

module.exports= newId;