const { contacts, email} = require('../services');


const listContacts = async (req, res, next) => {
  try {
      const allContacts = await contacts.listContacts();
      email.sendEmail();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: allContacts
      }
    });

  } catch (error) {
    next(error);
  };
};


const getContactById = async (req, res, next) => {
  try {
    const {id}  = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      const error = new Error(`Not found contact with id=${id}`);
      error.status = 404;
      throw error;
    }
    
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
};


const addContact = async (req, res, next) => {
    try {
        const result = await contacts.addContact(req.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        if(error.message.includes('duplicate')){
            error.status = 400
        }
        next(error);
    }
};


const removeContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contacts.removeContact(id);
        if (!result) {
            const error = new Error(`Not found contact with id=${id}`);
            error.status = 404;
            throw error;
        }
        res.json({
            status: 'success',
            code: 200,
            message: "contact deleted",
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contacts.updateContact(id, req.body);
        if (!result) {
            const error = new Error(`Not found contact with id=${id}`);
            error.status = 404;
            throw error;
        }
    
        res.json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
};

const updateFavorite = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contacts.updateFavorite(id, req.body);
        if (!result) {
            const error = new Error(`Not found`);
            error.status = 404;
            throw error;
        }
        res.json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
};


module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateFavorite
};
