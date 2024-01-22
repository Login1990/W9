import express, {Express, NextFunction, Request, Response} from "express"
import index from "./routes/index"
import morgan from "morgan";

const app: Express = express()
const port: number = 3000


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//Routes
app.use('/', index)


app.listen(port, () => {
    console.log("Server is running at localhost:"+port)
})

export default app;