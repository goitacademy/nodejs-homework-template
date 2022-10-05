const express = require('express');

const Joi = require('joi');

const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
} = require('../../models/contacts');

const RequestError = require('../../helpers/RequestError');

const router = express.Router();

// Добавить схему этот аналог PropTypes npm joi
const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
    try {
        const result = await listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Двоеточие у пути означают динамический путь
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getContactById(id);
        if (!result) {
            // Улучшенный метод обработки ошибки
            throw RequestError(404, 'Not found');
            // Старый метод обработки ошибки
            // return res.status(404).json({ message: 'Not Found' });
        }
        res.json(result);
    } catch (error) {
        // Новый метод она идет в app.js и находит функцию с 4-мя параметрами
        // это единственная функция app.use с 4-мя параметрами.
        next(error);
        // Старый метод
        // const { status = 500, message = 'Server error' } = error;
        // res.status(status).json({ message });
    }
});

router.post('/', async (req, res, next) => {
    try {
        // Вызываю метод validate и передаю что нужно проверить
        // validate() возвращает объект с полем error
        // которое я деструктуризирую

        const { error } = addSchema.validate(req.body);
        if (error) {
            throw RequestError(400, `${error.message} field`);
        }
        const result = await addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await removeContact(id);
        if (!result) {
            throw RequestError(404, 'Not found');
        }
        res.json({ message: `contact deleted` });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);

        if (error) {
            throw RequestError(400, error.message);
        }
        const { id } = req.params;
        const result = await updateContact(id, req.body);

        if (!result) {
            throw RequestError(404, 'Not found');
        }
        // убираем статус res.status(201).json(result);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
