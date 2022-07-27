import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";

const getById = async (req: Request, res: Response) => {
    const { contactId } = req.params;
    const result = await Contact.model.findById(contactId);
    if (!result) {
        throw createError(404);
    }
    res.status(200).json(result)
}

export default getById;