const fs = require('fs').promises;
const path = require('path');
const { v4 } = require("uuid");

const contactPath = path.join("models","contacts.json" )
const getAllContacts = async () => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data);
  return contacts
};


const listContacts = async (req, res, some) => {
  try {
    const contacts = await getAllContacts();
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { contacts },
    })
  
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await getAllContacts();
    const contactById = await contacts.find((i) => i.id === contactId);
    if (!contactById) {
      return res.status(401).json({
        status: '401',
        code: 401,
        message: "Not found"
      })
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { contactById },
    })
  } catch (error) {
    console.log(error.message);
  }
};


const removeContact = async (req, res, next) => {
  const contacts = await getAllContacts();
  const { contactId } = req.params;
  const contactById = contacts.filter((i) => i.id !== contactId);
  if (contacts.length === contactById.length) {
    return res.status(404).json(
      {
        code: 404,
        message:"Not found"
      }
    )
  };
  await fs.writeFile(contactPath, JSON.stringify(contactById));
  return res.status(200).json(
    {
      code: 200,
      "message": "contact deleted"
    }
  );
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      const newContact = {
        id: v4(),
        name,
        email,
        phone
      };
      const contacts = await getAllContacts();
      const contactsNew = [...contacts, newContact]
      await fs.writeFile(contactPath, JSON.stringify(contactsNew))
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: { newContact },
      })
    }
    return
  }
  catch (error) {
    console.log(error);
  }
};


const updateContact = async (req,res,next) => {
  try {
    const {contactId} = req.params;
    const { name, email, phone } = req.body;
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        code: 400,
        message: "contact missing fields"
      })
    }
    const contacts = await getAllContacts()
    const indexContact = await contacts.findIndex(i => i.id === contactId);
    if (indexContact === -1) {
      res.status(404).json({
        code: 404,
        message:"Not found"
      })
    }
    contacts[indexContact] = {...contacts[indexContact], name, email, phone}
    await fs.writeFile(contactPath, JSON.stringify(contacts))
    return res.status(200).json({
      code: 200,
      data: contacts[indexContact]
    })
  }
  catch (error) {
  console.log(error.message);
}

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
