const {nanoid} = require('nanoid');
const Joi = require('joi');

const fs = require('fs/promises');
const path = require('path');


const contactsPath = path.join(__dirname, "/contacts.json");

const createUserDataValidator = (data) =>
  Joi
    .object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(12).required(),
      email: Joi.string().email({ minDomainSegments: 1 } ).required,
      phone: Joi.string().min(10).max(15).required(),
    })
    .validate(data);

const updateUserDataValidator = (data) =>
    Joi
      .object()
      .keys({
        name: Joi.string().min(3).max(12),
        email: Joi.string().email({ minDomainSegments: 1}),
        phone: Joi.string().min(10).max(15),
      })
      .validate(data);

const listContacts = async () => {
    try {
      const userList = await fs.readFile(contactsPath);
      const users = JSON.parse(userList);

      return users;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
    }

  

const getContactById = async (contactId) => {
  try {
    const userList = await fs.readFile(contactsPath);
    const users = JSON.parse(userList);

    const userByID = users.filter(user => user.id === contactId)

    return userByID;
  } catch (error) {
    
  }
}

const removeContact = async (contactId) => {
  try {
    const userList = await fs.readFile(contactsPath);
    const users = JSON.parse(userList);

    const newUsers = users.filter(user => user.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(users));
    return newUsers;
  } catch (error) {
     console.log(error.message);
     throw error;
  }
}

const addContact = async (body) => {

    try {
      const validationResult = createUserDataValidator(body);

    if (validationResult.error) {
      
      console.log(validationResult.error.message);
      throw new Error("Invalid data");
    }
      
      const userList = await fs.readFile(contactsPath);
      const users = JSON.parse(userList);

      const {name, email, phone} = body;

      const newUser = {
        id: nanoid,
        name,
        email,
        phone, 
      }


      users.push(newUser);
      await fs.writeFile(contactsPath, JSON.stringify(users));
      return newUser;

    } catch (error) {
        console.log(error.message);
        throw error;
    }

}

const updateContact = async (contactId, body) => {
  try {
    const validationResult = updateUserDataValidator(body);

  if (validationResult.error) {
    
    console.log(validationResult.error.message);
    throw new Error("Invalid data");
  }

  if(!body) {
    throw new Error("missing fields");
  }

    
    const userList = await fs.readFile(contactsPath);
    const users = JSON.parse(userList);

    

    const userIndex = users.filter((user)=> user.id === contactId);
    const updatedUser = {
      ...users[userIndex],
      ...body,
    };

    users[userIndex] = updatedUser;
    
    
    await fs.writeFile(contactsPath, JSON.stringify(users));
    return updatedUser;

  } catch (error) {
      console.log(error.message);
      throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
