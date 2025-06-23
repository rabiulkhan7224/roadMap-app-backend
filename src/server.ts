import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from './routes';
const app = express()
const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB()
app.use(cookieParser());
app.use(express.json());

app.use(cors({ origin: ['http://localhost:3000','https://road-map-app-backend.vercel.app'], credentials: true }));

app.use('/api', router);

app.get('/', (req, res) => {
    res.send('roadmap app backend is running here')

})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


