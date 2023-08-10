import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import router from './routers/routes.js'


const PORT =  process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())


const DB_NAME = "subscription"
const CONNEXTION_URI = `mongodb://127.0.0.1/${DB_NAME}`

mongoose.connect(CONNEXTION_URI)
.then(()=>app.listen(PORT,()=>console.log("connected to database")))
.catch(error=> console.log(error.message))

app.use('/',router)

