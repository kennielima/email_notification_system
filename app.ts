import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes'
import emailRoutes from './routes/emailRoutes';
import cronJob from './utils/cronJob';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(bodyParser.json());
app.use('/', authRoutes);
app.use('/', emailRoutes);

cronJob.start();

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
  })
