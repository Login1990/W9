import express, {Express, NextFunction, Router, Request, Response} from "express"
const router = Router()

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.render("index", {title: "Express with TS and Pug"})
});

router.get("/register.html", (req: Request, res: Response, next: NextFunction) => {
    res.render("register", {title: "Register"})
})

router.get("/login.html", (req: Request, res: Response, next: NextFunction) => {
    res.render("login", {title: "Login"})
})

export default router