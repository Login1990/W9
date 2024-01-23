import express, {Express, NextFunction, Request, Response} from "express"
import index from "./routes/index"
import users from "./routes/users"
import morgan from "morgan";
import path from 'path';
import mongoose from "mongoose";


const app: Express = express()
const port: number = 3000
//Mongoose integration

mongoose.connect("mongodb://0.0.0.0:27017/testdb")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"))
db.once('open', () => {
    console.log('Connected to the database');
});

//Pug view configuration
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'pug');

//Public directory
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//Routes
app.use('/', index)
app.use('/', users)


app.listen(port, () => {
    console.log("Server is running at localhost:"+port)
})

export default app;