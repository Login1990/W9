import express, {Express, NextFunction, Router, Request, Response} from "express"
import Users from "../models/Users"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

const router = Router()
dotenv.config()

router.post("/register/registration", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existingUser = await Users.findOne({ email: req.body.email });
        
      if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
  
        await new Users({
          email: req.body.email,
          password: hash
        }).save();
        res.status(302).send("Success")
      } else {
        // Handle the case where the email already exists
        res.status(400).send('Email already exists');
      }
    } catch (err) {
      console.error(err);
      // Handle other errors as needed
      res.status(500).send('Internal Server Error');
    }
  });
router.post("/login/verification", async (req: Request, res: Response, next: NextFunction) => {
  try{
    const foundUser = await Users.findOne({email: req.body.email});
    if(foundUser){
      bcrypt.compare(req.body.password, <string>foundUser.password, (err, isMatch) => {
        if(isMatch){
          const payload = {
            email: req.body.email,
            password: foundUser.password
          }
          if(!process.env.SECRET){
            res.status(500).send("Secret is not defined")
          }
          const token = jwt.sign(payload, <string>process.env.SECRET)
          res.status(200).json({token})
        } else{
          throw err;
        }
      })
    } else {
      res.status(400).send("Email not found")
    }
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal server error")
  }
})

router.get("/login/authentification", (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization
    if (token && process.env.SECRET){
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
          res.status(401).json({error: "Token verification failed. :("})
        } else {
          res.json(decoded)
        }
      })
    }
})

export default router