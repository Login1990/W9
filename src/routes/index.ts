import express, {Express, NextFunction, Router, Request, Response} from "express"
const router = Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.render("index", {title: "Express with TS and Pug"})
});

export default router