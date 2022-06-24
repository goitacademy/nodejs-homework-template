const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../services/contacts');

const get = async (req, res, next) => {
  try {
    const {_id} = req.user;
      const results = await listContacts(_id);
    res.json({
      status: 'success',
      code: 200,
      data: {
      contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await getContactById(id);
    if (result) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact: result,
        },
      });
    }
      const code = 404;
  
      res.status(code).json({
        status: 'error',
        code: `${code}`,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const post = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newContact = await addContact(req.body, _id);
    if (newContact) {
      return res.json({
      status: 'success',
      code: 201,
      data: {
        contact: newContact,
      },
    });
    } 
      const code = 400;
     res.status(code).json({
        status: 'error',
        code: `${code}`,
        message: `Bad Request`,
        data: 'Not Created',
      });
    
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const put = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await updateContact(id, req.body);
    if (contact) {
      return res.json({
      status: 'success',
      code: 200,
      data: {
        contact: contact,
      },
    });
    } 
      const code = 404;
     res.status(code).json({
        status: 'error',
         code: `${code}`,
        message: `Not found contact id: ${id}`,
        data: 'Not Updated',
      });
   
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await removeContact(id);

    if (deletedContact) {
      return res.json({
      status: 'success',
      code: 201,
      data: {
        contact: deletedContact,
      },
    });
    } 
      const code = 404;
     res.status(code).json({
        status: 'error',
        code: `${code}`,
        message: `Not found contact id: ${id}`,
        data: 'Not Deleted',
      });
    
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const patch = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    if (!req.body) {
       const code = 400;
     return res.status(code).json({
        status: 'error',
         code: `${code}`,
        message: 'missing field favorite',
        data: 'Not Updated',
      });
    } 
    const contact = await updateStatusContact(id, req.body);

    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact: contact,
        }
      })
    } 
      const code = 404;
     res.status(code).json({
        status: 'error',
         code: `${code}`,
        message: `Not found contact id: ${id}`,
        data: 'Not Updated',
      });
  
  } catch (e) {
    console.error(e);
    next(e);
  }
};


module.exports = {
    get, getById, post, put, remove, patch
}
