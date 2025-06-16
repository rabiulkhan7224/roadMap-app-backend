import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
const app= express()
const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB()

app.get('/', (req, res) => {    
    res.send('roadmap app backend is running here')

    })
    app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    })


