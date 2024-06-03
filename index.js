import express from 'express'
import cors from "cors"
import bodyParser from "body-parser";
import LinkRouter from './Routers/LinkRouter.js';
import UserRouter from './Routers/UserRouter.js';
import connectDB from './database.js';

connectDB();

const app = express()
app.use(cors());
app.use(bodyParser.json());

const port = 3000

app.use('/links', LinkRouter);
app.use('/users', UserRouter);


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})
