import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import router from './routers/routes.js'


const PORT =  process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())


const DB_NAME = "richpanel_api_db"
const CONNECTION_URL = `mongodb+srv://flightUser:flightDEVREV@flightticketbooking.bcf91v0.mongodb.net/${DB_NAME}`

mongoose.connect(CONNECTION_URL)
.then(()=>app.listen(PORT,()=>console.log("connected to database")))
.catch(error=> console.log(error.message))

app.use('/',router)

