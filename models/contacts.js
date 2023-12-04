const fs = require('fs/promises');
const mongo = require('./mongo')


const createContact = async (Data) => {
  try{
    console.log(Data);
    const contactregister = await mongo.create(Data);
    console.log(contactregister);
    if(!contactregister) {
      return {
        success: false,
        result: null,
        message: "There is an error try creating contact"
      }
    }
    return {
      success: false,
        result: null,
        message: "Contact registered successfully"
    }
    
    
  } catch (error) {
    console.log(error);
    return {
      success: false,
        result: null,
        message: error,
    }
  }
}

const findContact =  async () => {
  try {
    
    const contact = await mongo.find();
    console.log(contact);
    return {
      success: true,
      result: contact,
      message: "List of contacts"
    }
  } catch (error) {
    return {
      success: false,
        result: null,
        message: error,
    }
  }

}

const findByIdContact =  async (id) => {
  try {
 
    const contact = await mongo.findById(id);
    console.log(contact);

    if(!contact) {
      return {
        success: false,
        result: null,
        message: "Not found contact with byId"
      }
    }
    return {
      success: true,
      result: contact,
      message: "contact byID"
    }
  } catch (error) {
    return {
      success: false,
        result: null,
        message: error,
    }
  }

}

const updateContact = async (id, data) =>{
try {
  const contact = await mongo.findByIdAndUpdate(id, data);

  console.log(contact);
  if(!contact){
    return {
      success: false,
      result: null,
      message: "There was an error to update contact"
    }
  }

  return{
    success: true,
    result: contact,
    message: "The was update successfully"
  }
} catch (error) {
  return {
    success: false,
      result: null,
      message: error,
  }
}
}

module.exports = {
  createContact,
  findContact,
  findByIdContact,
  updateContact,
  
}
