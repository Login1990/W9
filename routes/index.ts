import express, {Express, NextFunction, Router, Request, Response} from "express"
const router = Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello from TS!")
});

export default router