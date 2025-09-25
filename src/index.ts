import express from 'express'

import productRouter from "./routers/productRouter.ts"
import { PrismaClient } from "../generated/prisma/index.js";
import swaggerDocs from './swagggers/swagger.ts';


// import { PrismaClient } from "@prisma/client";

const app = express()
app.use(express.json())
const port = 5000

export const prisma =new PrismaClient()

app.use('/product',productRouter)


app.listen(port,()=>{
    console.log(`Server running port ${port}`)
    swaggerDocs(app, port)
})