import express, {Express, NextFunction, Router, Request, Response} from "express"
import Users from "../models/Users"
import bcrypt from "bcrypt"

const router = Router()

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


export default router