import { Request, Response } from "express";


const logout = (req: Request, res: Response) => {
    res.json(null);
}

export default logout;