const Contact = require("../models/contact")

async function getAll(_, res, next) {
    try {
        const docs = await Contact.find().exec();
        res.status(200).send(docs);
    } catch (err) {
        next(err)
    }
}

async function getById(req, res, next) {
    const {id} = req.params;
    try {
        const doc = await Contact.findById(id).exec();
        if (doc === null) {
            res.status(404).send({message: `Contact with id ${id} is not found`})
        } else {
            res.status(200).send(doc);
        }
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    const contact =  {
        name: req.body.name, 
        email: req.body.email, 
        phone: req.body.phone, 
        favorite: req.body.favorite
    };
    try {
        const doc = await Contact.create(contact)
        res.status(201).send(doc);
    } catch(err) {
        next(err)
    }
}

async function update(req, res, next) {
    const {id} = req.params;
    const contact =  {
        name: req.body.name, 
        email: req.body.email, 
        phone: req.body.phone, 
        favorite: req.body.favorite
    };
    try {
        const doc = await Contact.findByIdAndUpdate(id, contact, {new: true}).exec();
        if (doc === null) {
            res.status(404).send({message: `Contact with id ${id} is not found`});
        } else {
            res.status(201).send(doc);
        }
    } catch(err) {
        next(err)
    }
}

async function remove(req, res, next) {
    const {id} = req.params;
    try {
        const doc = await Contact.findByIdAndRemove(id).exec();
        if (doc === null) {
            res.status(404).send({message: `Contact with id ${id} is not found`})
        } else {
            res.status(204).end();
        }
    } catch (err) {
        next(err);
    }
}

async function updateStatus(req, res, next) {
    const {id} = req.params;
    const newStatus =  {
        favorite: req.body.favorite
    };
    try {
        const doc = await Contact.findByIdAndUpdate(id, newStatus, {new: true}).exec();
        if (doc === null) {
            res.status(404).send({message: `Contact with id ${id} is not found`});
        } else {
            res.status(200).send(doc);
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update,
    updateStatus
}
