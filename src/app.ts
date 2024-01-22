import express, {Express, NextFunction, Request, Response} from "express"
import index from "./routes/index"
import morgan from "morgan";
import path from 'path';


const app: Express = express()
const port: number = 3000

//Pug view configuration
app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'pug');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//Routes
app.use('/', index)


app.listen(port, () => {
    console.log("Server is running at localhost:"+port)
    console.log(__dirname)
})

export default app;