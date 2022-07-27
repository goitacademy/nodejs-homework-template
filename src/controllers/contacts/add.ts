import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";

const add = async (req: Request, res: Response) => {
    const { body } = req;
    const { error } = Contact.outerSchema.validateAdd(body);
    if (error) {
        throw createError(400);
    }
    const result = await Contact.model.create(body);
    res.status(201).json(result);
}

export default add;