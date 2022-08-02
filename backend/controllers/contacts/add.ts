import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";

const add = async (req: Request, res: Response) => {
    const { body } = req;
    const { error } = Contact.outerSchema.validateContactAdd(body);
    if (error) {
        throw createError({
            status: 400,
        });
    }
    const result = await Contact.model.create(body);
    res.status(201).json(result);
}

export default add;