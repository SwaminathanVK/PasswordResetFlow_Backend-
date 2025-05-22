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



app.use(cors({
    origin: 'https://passwordresetappfrontend.netlify.app',  // or your frontend domain
    credentials: true,
    // const resetLink = 'https://passwordresetappfrontend.netlify.app
  }));



const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})