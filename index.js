import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Database/dbConfig.js';
import authRoutes from './Routers/authRouter.js';
import cors from 'cors';


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/auth', authRoutes);


const allowedOrigins = [
  'http://localhost:3000',
  'https://passwordresetappfrontend.netlify.app'
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));



const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})