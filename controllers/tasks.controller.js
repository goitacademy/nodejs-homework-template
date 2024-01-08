const fs = require("node:fs");
const path = require("node:path");
const shortid = require('shortid');
const { stringify } = require("node:querystring");

const contactsPath = path.join(__dirname, "..", "models", "contacts.json");
console.log(contactsPath);


const getAllTasks = async (req, res, next) => {
    try {
        fs.readFile(contactsPath, "utf-8", (err, data) => {
            if (err) {
                next(err);
            }
            res.status(200).json({
                title: 'Success',
                msg: 'Task obtained successfuly',
                code: 200,
                result: JSON.parse(data),
            });
        });
    } catch (error) {
        next(error);
    }
};


const getTasksById = async (req, res, next) => {
    try {
        fs.readFile(contactsPath, "utf-8", (err, data) => {
            if (err) {
                next(err);
            }
            const listContacts = JSON.parse(data);
            const contactById = listContacts.filter(c => c["id"] == req.params.contactId);

            if (contactById.length == 0) {
                next();
            }
            else {
                res.status(200).json({
                    title: 'Success',
                    msg: 'Task obtained successfuly',
                    code: 200,
                    result: contactById,
                });
            }
        });
    } catch (error) {
        next(error);
    }
};


const addContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        fs.readFile(contactsPath, "utf-8", (err, data) => {
            if (err) {
                next();
            }
            
            const newListContact = [
                ...JSON.parse(data),
                {
                    "id": shortid.generate(),
                    "name": name,
                    "email": email,
                    "phone": phone
                }
            ];
    
            fs.writeFile(contactsPath, JSON.stringify(newListContact), (err) => {
                if (!!err) {
                    next(err);
                }
                
                res.status(201).json({
                    title: 'Success',
                    msg: 'Task created successfuly',
                    code: 201,
                    result: newListContact,
                });
            });

        });        
    } catch (error) {
        next(error);
    }
};


const removeContact = async (req, res, next) => {
    try {
        fs.readFile(contactsPath, "utf-8", (err, data) => {
            if (err) {
                next(err);
            }
            const listContacts = JSON.parse(data);
            const isContact = listContacts.filter(c => c["id"] == req.params.contactId);

            if (isContact.length == 0) {
                next(err);
            }
            else {
                const removedContact = listContacts.filter(c => c["id"] != req.params.contactId);
                const newListContact = JSON.stringify(removedContact);

                fs.writeFile(contactsPath, newListContact, (err) => {
                    if (!!err) {
                        next(err);
                    }
                    res.status(200).json({
                        title: 'Success',
                        msg: 'Task removed successfuly',
                        code: 200,
                        result: removedContact,
                    });
                });                
            }
        });
    } catch (error) {
        next(error);
    }
};


const updateContact = async (req, res, next) => {
    try {
        const toUpdate = { 
            name: req.body.name, 
            email: req.body.email, 
            phone: req.body.phone 
        };

        fs.readFile(contactsPath, "utf-8", (err, data) => {
            if (err) {
                next();
            }

            const listContacts = JSON.parse(data);
            const contactToUpdate = listContacts.filter(c => c["id"] == req.params.contactId);
            
            if (contactToUpdate.length == 0) {
                next(err);
            }
            else {
                const newContactToUpdate = contactToUpdate[0];
                const newListContact = listContacts.map( objeto => {

                    if (objeto['id'] === newContactToUpdate['id']) {
                        return { ...objeto, 
                            name: toUpdate.name == undefined ? objeto['name']: toUpdate.name,
                            email: toUpdate.email == undefined ? objeto['email']: toUpdate.email,
                            phone: toUpdate.phone == undefined ? objeto['phone']: toUpdate.phone,
                        };
                    }
                    return objeto;
                });

                fs.writeFile(contactsPath, JSON.stringify(newListContact), (err) => {
                    if (!!err) {
                        next(err);
                    }
                    
                    res.status(200).json({
                        title: 'Success',
                        msg: 'Task updated successfuly',
                        code: 200,
                        result: newListContact,
                    });
                });
            }

        });        
    } catch (error) {
        next(error);
    }
};

module.exports = {getAllTasks, getTasksById, addContact, removeContact, updateContact}