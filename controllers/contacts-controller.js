import * as countactService from '../models/contacts.js';
import { HttpError } from '../helpers/HttpError.js';

export const getAll = async (req, res, next) => {
        const result = await countactService.listContacts();
        res.json(result);
}

export const getById = async (req, res) => {
        const id = req.params.contactId
        const result = await countactService.getContactById(id);
        if (!result) {
            throw HttpError(404, `Not found`)
        }
        res.json(result);
}

export const add = async (req, res) => {
    const result = await countactService.addContact(req.body)   
    res.status(201).json(result)
}

export const updateById = async (req, res) => {
        const id = req.params.contactId
        const result = await countactService.updateContact(id, req.body)
        if (!result) {
            throw HttpError(404, `Not found`)
        }
        res.status(200).json(result)
}

export const deleteById = async (req, res) => {
        const id = req.params.contactId;
        const result = await countactService.removeContact(id);
        if (!result) {
            throw HttpError(404, `Not found`)
        }
        res.status(200).json({
            message: "Delete success"
        })
    }