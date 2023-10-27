const {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    removeContact
} = require('./contact.dao');
const joi = require("joi");

const contactValidate = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
});

const contactFavorite = joi.object({
    favorite: joi.boolean().required(),
  });


const get = async (req, res, next) => {
    try {
        const results = await getAllContacts();
        res.json({
            status: 'success',
            code: 200,
            data: {
                contacts: results,
            }
        })
    }
    catch (e) {
        console.error(e)
        next(e)
    }
}

const getById = async (req, res, next) => {
    const { id } = req.params
    try {
        const result = await getContactById(id)
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: {task: result},
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found task id: ${id}`,
                data: 'Not Found',
            })
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const create = async (req, res, next) => {
    const { value, error } = contactValidate.validate(req.body);
    const { name, email, phone } = value;
    if (error) {
        res.status(400).json({ message: error.message})
        return
    }

    try {
        const result = await createContact({name, email, phone})
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {contact: result},
        })
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const update = async (req, res, next) => {
    const { id } = req.params;
    const { value, error } = contactValidate.validate(req.body);
    const { name, email, phone } = value;
    if (error) {
        res.status(400).json({ message: error.message})
        return
    }

    try {
        const result = await updateContact(id, {name, email, phone})
        if (result) {
        res.json({
            status: 'success',
            code: 200,
            data: {contact: result},
        })
        } else {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found task id: ${id}`,
            data: 'Not Found',
        })
       }
   } catch (e) {
        console.error(e)
        next(e)
    }
}

const updateStatus = async (req, res, next) => {
    const { id } = req.params;
    const { value, error } = contactFavorite.validate(req.body);
    const { favorite } = value;
    if (error) {
        res.status(400).json({ message: 'missing field favorite'})
        return
    }

    try {
        const result = await updateContact(id, {favorite})
        if (result) {
        res.json({
            status: 'success',
            code: 200,
            data: {contact: result},
        })
        } else {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found task id: ${id}`,
            data: 'Not Found',
        })
       }
   } catch (e) {
        console.error(e)
        next(e)
    }
}

const remove = async (req, res, next) => {
    const { id } = req.params;

    try {
        const result = await removeContact(id)
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: {task: result},
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found task id: ${id}`,
                data: 'Not Found',
            })
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    updateStatus,
    remove,
}