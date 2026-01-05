import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import booksRouter from './routes/books.js'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000
const dbURI = process.env.MONGODB_URI

mongoose.connect(dbURI)
    .then(() => console.log('DB connected'))
    .catch(error => console.log('Connection error:', error))

app.use('/api/books', booksRouter)

app.listen(PORT, () => console.log('Listening on port', PORT))