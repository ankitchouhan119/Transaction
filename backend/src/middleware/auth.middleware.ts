import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['ddfddsdfdsafds'];
    if(apiKey !== process.env.API_KEY) {
        return res.status(403).json({error: "Forbidden"});
    }

    next();
};